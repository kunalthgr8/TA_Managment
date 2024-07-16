import React, { useState } from "react";
import { ProfileLogo, Card, Button } from "../index";
import cat from "../../assets/cat.jpg";
import { useNavigate } from "react-router-dom";

const ProfileDetails = ({ details }) => (
  <div className="flex justify-center self-center flex-col gap-4 text-custom-black">
    <p className="font-bold text-2xl text-custom-purple">
      Code: {details.CourseCode}
    </p>
    <p className="font-bold text-base italic ">Name: {details.CourseName}</p>
    <p className="font-bold text-base italic">Professor: {details.Professor}</p>
    <p className="font-bold text-sm italic">Semester: {details.Semester}</p>
    {/* {details.map((detail, index) => (
    ))} */}
  </div>
);

function CourseDetail() {
  let TaAdded = false;
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({
    CourseCode: "CS690",
    Semester: "Monsoon23-24",
    Professor: "Dr. Gagan Raj Gupta",
    CourseName: "Machine Learning",
    // status: "COURSE_REGISTERED",
    status: "TA_ASSIGNED",
  });

  if (courseDetails.status === "COURSE_REGISTERED") {
    TaAdded = false;
  } else if (courseDetails.status === "TA_ASSIGNED") {
    TaAdded = true;
  }else{
    TaAdded = false;
  }

  const taInfo = (
    <div className="flex flex-col w-full justify-center self-center p-4 sm:p-10 pt-0 gap-2">
      {[1, 2, 3, 4].map((item) => (
        <Card
          key={item}
          className="sm:m-5 shadow-xl w-3/4 rounded-3xl flex justify-center self-center"
          src={cat}
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

  return (
    <div className="bg-custom-purple w-full lg:w-4/5 pt-7">
      <div className="bg-white rounded-2xl m-10">
        <div className="flex flex-col justify-center self-center md:flex-row md:items-center md:justify-around md:content-center p-10 gap-5">
          <img
            src={cat}
            alt="Professor"
            className="w-[200px] h-[200px] rounded-full flex justify-center self-center"
          />
          <ProfileDetails details={courseDetails} />
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
