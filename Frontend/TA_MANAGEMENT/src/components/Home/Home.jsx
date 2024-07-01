import React from "react";
import { useSelector } from "react-redux";
import { AddCourse, Login } from "../index";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const facultyStatus = "Course Added";
  // const facultyStatus = "Not Assigned";
  return (
    <>
      {facultyStatus === "Course Added" && isAuthenticated && (
        <div className="w-4/5 flex flex-col gap-3 justify-center self-center mt-10 m-8 pl-2 pr-2 ">
          <div className="bg-white flex justify-between self-center w-3/4 rounded-lg p-5">
            <h1 className="font-bold text-base">IC500: Machine Learning</h1>
            <p className="font-medium text-sm">Soon...</p>
          </div>
          <div className="bg-white flex justify-between self-center w-3/4 rounded-lg p-5">
            <h1 className="font-bold text-base">IC200: Operating System</h1>
            <p className="font-medium text-sm cursor-pointer" onClick={()=> navigate('/course-detail/:courseId')}>Add TA's</p>
          </div>
          <div className="bg-white flex justify-between self-center w-3/4 rounded-lg p-5">
            <h1 className="font-bold text-base">IC100: Intro to Programming</h1>
            <p className="font-medium text-sm cursor-pointer" onClick={()=> navigate('/course-detail/:courseId')}>Details</p>
          </div>
        </div>
      )}
      {facultyStatus === "Not Assigned" && isAuthenticated && (
        <div className="w-4/5 flex justify-center self-center mt-10 m-8 ">
          <AddCourse />
        </div>
      )}
      {!isAuthenticated && <Login />}
    </>
  );
}

export default Home;
