import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { ProfileLogo, Card, Button, Loader } from "../index";
import cat from "../../assets/cat.jpg";
import {
  GET_COURSE_BY_CODE,
  GET_TA_BY_COURSE_CODE,
} from "../../graphql/queries/course.query";
import { GET_FACULTY_LEAVES } from "../../graphql/queries/facultyleave.query";

const ProfileDetails = ({ details, profName }) => (
  <div className="flex justify-center self-center flex-col gap-4 text-custom-black">
    <p className="font-bold text-2xl text-custom-purple">
      Code: {details.courseCode}
    </p>
    <p className="font-bold text-base italic">Name: {details.courseName}</p>
    <p className="font-bold text-sm italic">Professor: {profName}</p>
    <p className="font-bold text-sm italic">Semester: {details.semester}</p>
  </div>
);

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { idNumber, name } = useSelector((state) => state.auth.user);

  const { loading: courseLoading, error: courseError, data: courseData } = useQuery(GET_COURSE_BY_CODE, {
    variables: { courseCode: courseId, idNumber },
  });

  const { loading: leavesLoading, error: leavesError, data: leavesData } = useQuery(GET_FACULTY_LEAVES, {
    variables: { input: { courseId, idNumber } },
  });

  const { loading: taLoading, error: taError, data: taData } = useQuery(GET_TA_BY_COURSE_CODE, {
    variables: { courseCode: courseId, idNumber },
  });
  console.log("TA DATA IN COURSE",taData);

  const [courseDetails, setCourseDetails] = useState(null);
  const [numberOfLeaves, setNumberOfLeaves] = useState(0);

  useEffect(() => {
    if (courseData?.getCourseByCode?.data) {
      setCourseDetails(courseData.getCourseByCode.data);
    }
    if (leavesData?.getLeave?.data?.leave) {
      setNumberOfLeaves(leavesData.getLeave.data.leave[0].leaves.length);
    }
  }, [courseData, leavesData]);

  if (courseLoading || taLoading) {
    return (
      <div className="flex justify-center self-center gap-10 w-full mt-10">
        <Loader />
      </div>
    );
  }

  if (courseError || taError) {
    return <p>Error: {courseError ? courseError.message : taError.message}</p>;
  }

  if (!courseDetails) {
    return <p>No course details found.</p>;
  }

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="bg-custom-purple w-full lg:w-4/5 pt-7">
      <div className="bg-white rounded-2xl m-10">
        <div className="flex flex-col justify-center self-center md:flex-row md:items-center md:justify-around md:content-center p-10 gap-5">
          <img
            src={cat}
            alt="Professor"
            className="w-[200px] h-[200px] rounded-full flex justify-center self-center"
          />
          <ProfileDetails details={courseDetails} profName={capitalizeName(name)} />
        </div>
        <div className="flex justify-center self-center w-3/4">
          <div className="flex justify-center self-center p-5 pt-0 w-2/3">
            <Button
              className="bg-red-500 w-full text-white rounded-xl p-4"
              onClick={() => navigate(`/leaves/${courseId}`)}
            >
              Show Leaves {`(${numberOfLeaves})`}
            </Button>
          </div>
        </div>
        <h1 className="text-xl font-bold ml-5 sm:ml-24 mt-8">Teaching Assistant Information</h1>
        <div className="flex flex-col w-full justify-center self-center p-4 sm:p-10 pt-0 gap-2">
          {taData?.getTAByCourseCode?.data.map((ta, index) => (
            <Card
              key={index}
              className="sm:m-5 shadow-xl w-3/4 rounded-3xl flex justify-center self-center"
              src={ ta.profilePicture ||cat}
              user={{
                name: ta.name,
                email: ta.email,
                id: ta.idNumber,
                contact: ta.phoneNumber,
                approved: true,
              }}
            />
          ))}
        </div>
        <div className="flex justify-center self-center w-full">
          <div className="flex justify-center self-center p-5 w-2/3">
            <Button
              className="bg-custom-purple w-full text-white rounded-xl p-4"
              onClick={() => navigate(`/ta-list/${courseId}`)}
            >
              Add TAs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
