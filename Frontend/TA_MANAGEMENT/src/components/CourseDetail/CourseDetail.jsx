import React from "react";
import { ProfileLogo, Card } from "../index";
import cat from "../../assets/cat.jpg";

const ProfileDetails = ({ details }) => (
  <div className="flex justify-center self-center flex-col gap-2 text-custom-purple">
    {details.map((detail, index) => (
      <p key={index} className="font-bold text-base lg:text-lg">
        {detail}
      </p>
    ))}
  </div>
);

function CourseDetail() {
  const courseDetails = [
    "Course Code: CS690",
    "Semester: Monsoon23-24",
    "Professor: Dr. Gagan Raj Gupta",
    "Course Name: Machine Learning",
  ];

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
        <h1 className="text-2xl font-bold ml-5 sm:ml-24 mt-5">
          Teaching Assistant Information
        </h1>
        <div className="flex flex-col w-full justify-center self-center p-4 sm:p-10 pt-0 gap-2">
          {[1, 2, 3, 4].map((item) => (
            <Card
              key={item}
              className="sm:m-5 shadow-xl w-3/4  rounded-3xl flex justify-center self-center"
              src={cat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
