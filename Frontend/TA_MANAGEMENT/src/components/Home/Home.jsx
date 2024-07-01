import React from "react";
import { useSelector } from "react-redux";
import { AddCourse } from "../index";

function Home() {
  const user = useSelector((state) => state.user);
  const facultyStatus = "Course Added";
  // const facultyStatus = "Not Assigned";
  return (
    <>
      {facultyStatus === "Course Added" && (
        <div className="w-4/5 flex flex-col gap-3 justify-center self-center mt-10 m-8 pl-2 pr-2 ">
          <div className="bg-white flex justify-between self-center w-3/4 rounded-lg p-5">
            <h1 className="font-bold text-base">IC500</h1>
            <p className="font-medium text-sm">Soon...</p>
          </div>
          <div className="bg-white flex justify-between self-center w-3/4 rounded-lg p-5">
            <h1 className="font-bold text-base">IC200</h1>
            <p className="font-medium text-sm cursor-pointer">Add TA's</p>
          </div>
          <div className="bg-white flex justify-between self-center w-3/4 rounded-lg p-5">
            <h1 className="font-bold text-base">IC100</h1>
            <p className="font-medium text-sm cursor-pointer">Details</p>
          </div>
        </div>
      )}
      {facultyStatus === "Not Assigned" && (
        <div className="w-4/5 flex justify-center self-center mt-10 m-8 ">
          <AddCourse />
        </div>
      )}
    </>
  );
}

export default Home;
