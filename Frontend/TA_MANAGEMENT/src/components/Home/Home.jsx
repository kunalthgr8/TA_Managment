import React from "react";
import { useSelector } from "react-redux";
import { AddCourse, Login, Button, TaForm } from "../index";
import { useNavigate } from "react-router-dom";
import Wait from "../../assets/wait.svg";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const facultyStatus = "Course Added";
  // const facultyStatus = "Not Assigned";
  const taStatus = "Form Not Filled";
  // const taStatus = "Not Assigned";
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  console.log("If Faculty :", isFaculty)
  return (
    <>
      {isFaculty && facultyStatus === "Course Added" && isAuthenticated && (
        <div className=" w-full md:w-4/5 flex flex-col gap-3 justify-center self-center mt-10 m-8 pl-2 pr-2 ">
          <div className="bg-white flex justify-between self-center w-full md:w-3/4 rounded-lg p-5  shadow-xl">
            <h1 className="font-bold text-base">IC500: Machine Learning</h1>
            <p className="font-medium text-sm">Soon...</p>
          </div>
          <div
            className="bg-white flex justify-between self-center w-full md:w-3/4 rounded-lg p-5 shadow-xl"
            onClick={() => navigate("/course-detail/:courseId")}
          >
            <h1 className="font-bold text-base">IC200: Operating System</h1>
            <p className="font-medium text-sm cursor-pointer">Add TA's</p>
          </div>
          <div
            className="bg-white flex justify-between self-center w-full md:w-3/4 rounded-lg p-5 shadow-xl"
            onClick={() => navigate("/course-detail/:courseId")}
          >
            <h1 className="font-bold text-base">IC100: Intro to Programming</h1>
            <p className="font-medium text-sm cursor-pointer">Details</p>
          </div>
          <div className="flex justify-between self-center w-full md:w-3/4 rounded-lg p-5">
            <Button
              width="w-full flex justify-center self-center"
              className="text-custom-purple w-5/12 lg:w-1/3 font-bold bg-white p-2 rounded-lg shadow-xl "
              onClick={() => navigate("/addCourse")}
            >
              Add New Course
            </Button>
          </div>
        </div>
      )}
      {isFaculty && facultyStatus === "Not Assigned" && isAuthenticated && (
        <div className="w-4/5 flex justify-center self-center mt-10 m-8 ">
          <AddCourse />
        </div>
      )}
      {!isFaculty && isAuthenticated && taStatus === "Not Assigned" && (
        <div className=" w-full md:w-4/5 flex flex-row gap-3 justify-center self-center mt-10 m-8 pl-2 pr-2 ">
          <div className="bg-white flex flex-col justify-center self-center w-full md:w-2/3 rounded-lg p-5 shadow-xl gap-10">
            <img src={Wait} alt="Waiting" width="300px" className="align-middle self-center" />
            <h1 className="font-bold text-base text-center">
              Wait for Faculty Approval....
            </h1>
          </div>
        </div>
      )}
      {!isFaculty && isAuthenticated && taStatus === "Form Not Filled" && (
        <div className=" w-full md:w-4/5 flex flex-col gap-3 justify-center self-center mt-10 m-8 pl-2 pr-2 ">
          <TaForm />
        </div>
      )}
      {!isAuthenticated && <Login />}
    </>
  );
}

export default Home;
