import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button } from "../index"; // Assuming Select component is imported
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_COURSES } from "../../graphql/queries/course.query.js";
import { MdCheck, MdCancel } from "react-icons/md";
import { ADD_TA_TO_COURSE } from "../../graphql/queries/course.query.js";

function ToBeApprovedFor() {
  const { taId,courseId } = useParams();
  console.log("TA ID:", taId);
  console.log("Course ID:", courseId);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [data, setData] = useState({
    courseCode: "",
    confirmTA: taId || "", // Initialize confirmTA with taId from URL params
  });
  const [coursesOptions, setCoursesOptions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: courseDetails,
    loading: courseLoading,
    error: courseError,
  } = useQuery(GET_ALL_COURSES, {
    variables: { idNumber: userData?.idNumber },
  });

  const [addTaToCourse] = useMutation(ADD_TA_TO_COURSE);

  useEffect(() => {
    if (courseDetails?.getCourses?.data?.courses) {
      console.log(
        "Course Name:",
        courseDetails.getCourses.data.courses[0].courseName
      );
      setCoursesOptions(
        courseDetails.getCourses.data.courses.map((course) => ({
          value: course.courseCode,
          label: course.courseName, // Assuming courseName is available
        }))
      );
    }
  }, [courseDetails]);

  const handleSubmit = async () => {

    try {
      setLoading(true);
      const response = await addTaToCourse({
        variables: {
          idNumber: userData?.idNumber,
          courseCode: courseId,
          taId: taId,
        }
      });
      console.log("Data:", data);
      setLoading(false);
      console.log("TA Approved Successfully", response);
      navigate("/"); // Navigate to desired route on success
    } catch (error) {
      console.error("Error approving TA:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  console.log("Courses Options:", coursesOptions);

  return (
    <div className="flex flex-row w-full justify-center m-10 gap-10">
      <div className="flex flex-col justify-center self-center gap-5 w-4/5 lg:w-2/3">
        <h1 className="text-white">Approve TA for Course</h1>
        <div className="flex flex-col w-full lg:w-4/5 justify-center self-center bg-white rounded-lg p-8 pb-4">
          <div className="flex flex-col w-full gap-3">
            <h1 className="text-sm text-custom-purple font-semibold">
              Approval Form
            </h1>
            {error && <h1 className="text-red-500">{error}</h1>}
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-custom-black">
                  COURSE CODE
                </p>
                <Input
                  type="text"
                  placeholder="TA IdNumber"
                  value={courseId}
                />
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-custom-black">
                  TA IdNumber
                </p>
                <Input
                  type="text"
                  placeholder="TA IdNumber"
                  value={data.confirmTA}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-evenly gap-10 self-center w-3/4">
            <Button
              className="bg-red-500 flex justify-center self-center gap-1 px-4 text-center rounded-lg text-white"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel <MdCancel className="flex justify-center self-center" />
            </Button>
            <Button
              className="bg-custom-purple flex  gap-1 px-4 text-center rounded-lg text-white"
              width="w-1/2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Approving..." : "Submit"}{" "}
              <MdCheck className="flex justify-center self-center" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToBeApprovedFor;
