import React from "react";
import { useSelector } from "react-redux";
import { AddCourse } from "../index";

function Home() {
  const user = useSelector((state) => state.user);
  const facultyStatus = "Not Assigned";

  return (
    <>
      {facultyStatus === "Not Assigned" ? (
        <div className="w-4/5 flex justify-center self-center mt-10 m-8 ">
          <AddCourse />
        </div>
      ) : (
        <div>
          <h1>Welcome to TA Management System</h1>
        </div>
      )}
    </>
  );
}

export default Home;
