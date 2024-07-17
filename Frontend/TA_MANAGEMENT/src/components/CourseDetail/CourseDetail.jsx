import React, { useEffect, useState } from "react";
import { ProfileLogo, Card, Button, Loader } from "../index";
import cat from "../../assets/cat.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import {
  GET_COURSE_BY_CODE,
  GET_TA_BY_COURSE_CODE,
} from "../../graphql/queries/course.query";

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
  const talisturl = `/ta-list/${courseId}`;
  const leavesUrl = `/leaves/${courseId}`;
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const idNumber = user.idNumber;

  const { loading, error, data } = useQuery(GET_COURSE_BY_CODE, {
    variables: { courseCode: courseId, idNumber },
  });

  const {
    loading: taLoading,
    error: taError,
    data: taData,
  } = useQuery(GET_TA_BY_COURSE_CODE, {
    variables: { courseCode: courseId, idNumber },
  });
  console.log("TA DATA: ", taData);
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    if (data && data.getCourseByCode && data.getCourseByCode.data) {
      setCourseDetails(data.getCourseByCode.data);
    }
    console.log("TA DATA in UseEffect: ", taData);
  }, [data]);

  if (loading || taLoading) {
    return (
      <div className="flex justify-center self-center gap-10 w-full mt-10">
        <Loader />
      </div>
    );
  }

  if (error || taError) {
    return <p>Error: {error ? error.message : taError.message}</p>;
  }

  if (!courseDetails) {
    return <p>No course details found.</p>;
  }

  const TaAdded = courseDetails.status === "TA_ASSIGNED";

  const taInfo = (
    <div className="flex flex-col w-full justify-center self-center p-4 sm:p-10 pt-0 gap-2">
      {taData &&
        taData.getTAByCourseCode &&
        taData.getTAByCourseCode.data.map((ta, index) => (
          // <h1> Hellooo</h1>
          <>
            <Card
              key={index}
              className="sm:m-5 shadow-xl w-3/4 rounded-3xl flex justify-center self-center"
              src={cat}
              user={{
                name: ta.name,
                email: ta.email,
                id: ta.idNumber,
                contact: ta.phoneNumber,
                approved: true,
              }}
            />
          </>
        ))}
    </div>
  );

  const addTaButton = (
    <div className="flex justify-center self-center  w-full">
      <div className="flex justify-center self-center p-5 w-2/3">
        <Button
          className="bg-custom-purple w-full text-white rounded-xl p-4"
          onClick={() => navigate(talisturl)}
        >
          Add TAs
        </Button>
      </div>
    </div>
  );
  const TaLeavesButton = (
    <div className="flex justify-center self-center  w-3/4">
      <div className="flex justify-center self-center p-5 pt-0 w-2/3">
        <Button
          className="bg-red-500 w-full text-white rounded-xl p-4"
          onClick={() => navigate(leavesUrl)}
        >
          Show Leaves
        </Button>
      </div>
    </div>
  );

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
          <ProfileDetails
            details={courseDetails}
            profName={capitalizeName(user.name)}
          />
        </div>
        {TaLeavesButton}
        <h1 className="text-xl font-bold ml-5 sm:ml-24 mt-8">
          Teaching Assistant Information
        </h1>
        {taData && taInfo}
        
        {addTaButton}
      </div>
    </div>
  );
}

export default CourseDetail;
