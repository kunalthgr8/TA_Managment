import React, { useEffect, useState } from "react";
import { ProfileLogo, Card, Button, Loader } from "../index";
import cat from "../../assets/cat.jpg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  GET_COURSE_BY_CODE,
  GET_TA_BY_COURSE_CODE,
} from "../../graphql/queries/course.query";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

const ProfileDetails = ({ details, profName }) => (
  <div className="flex justify-center self-center flex-col gap-4 text-custom-black">
    <p className="font-bold text-2xl text-custom-purple">
      Code: {details.courseCode}
    </p>
    <p className="font-bold text-base italic ">Name: {details.courseName}</p>
    <p className="font-bold text-sm italic">Professor: {profName}</p>
    <p className="font-bold text-sm italic">Semester: {details.semester}</p>
  </div>
);

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const idNumber = user.idNumber;
  const { loading, error, data } = useQuery(GET_COURSE_BY_CODE, {
    variables: { courseCode: courseId, idNumber: idNumber },
  });

  const [courseDetails, setCourseDetails] = useState(null);
  const [taDetails, setTaDetails] = useState([]);

  useEffect(() => {
    if (data && data.getCourseByCode && data.getCourseByCode.data) {
      setCourseDetails(data.getCourseByCode.data);

      // Fetch TA details
      if (data.getCourseByCode.data.selectedTAs.length > 0) {
        const {
          loading,
          error,
          data: taData,
        } = useQuery(GET_TA_BY_COURSE_CODE, {
          variables: { courseCode: courseId, idNumber: idNumber },
        });
        if (
          taData &&
          taData.getTAByCourseCode &&
          taData.getTAByCourseCode.data
        ) {
          setTaDetails(taData.getTAByCourseCode.data);
        }
      }
    }
  }, [data, courseId]);

  if (loading) {
    return (
      <div className="flex justify-center self-center gap-10 w-full mt-10">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!courseDetails) {
    return <p>No course details found.</p>;
  }

  const TaAdded = courseDetails.status === "TA_ASSIGNED";

  const taInfo = (
    <div className="flex flex-col w-full justify-center self-center p-4 sm:p-10 pt-0 gap-2">
      {courseDetails.selectedTAs.map((ta, index) => (
        <Card
          key={index}
          className="sm:m-5 shadow-xl w-3/4 rounded-3xl flex justify-center self-center"
          src={cat}
          user={taDetails[index]}
        />
      ))}
    </div>
  );

  const addTaButton = (
    <div className="flex justify-center self-center p-10 w-full">
      <Button
        width="flex justify-center self-center w-1/2"
        className="bg-custom-purple w-full text-white rounded-xl p-4"
        onClick={() => navigate("/ta-list")}
      >
        Add TA's
      </Button>
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
        <h1 className="text-xl font-bold ml-5 sm:ml-24 mt-8">
          Teaching Assistant Information
        </h1>
        {TaAdded ? taInfo : addTaButton}
      </div>
    </div>
  );
}

export default CourseDetail;
