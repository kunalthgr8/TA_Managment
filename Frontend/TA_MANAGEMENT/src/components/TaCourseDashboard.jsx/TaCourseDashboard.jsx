import React from "react";
import { useNavigate } from "react-router-dom";
import wait from "../../assets/wait.svg";

function TaCourseDashboard() {
  const [courses, setCourses] = React.useState([
    {
      courseCode: "IC200",
      courseName: "Introduction to Computing",
      selectedTAs: [],
    },
  ]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  return (
    <>
      {courses.length === 0 && (
        <div className="flex flex-col justify-center self-center mt-10">
          <img src={wait} alt="Wait till get Approval" width={"240px"} />
          <h1 className="flex flex-col justify-center self-center mt-10 text-white">
            Wait till Approval
          </h1>
        </div>
      )}
      {courses.length > 0 && (
        <div className="w-full mt-10 flex flex-col justify-center self-center">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white flex justify-between self-center w-full md:w-3/4 rounded-lg p-5 shadow-xl"
              onClick={() => navigate(`/leaves/${course.courseCode}`)}
            >
              <h1 className="font-bold text-base">{course.courseName}</h1>
              <p className="font-medium text-sm cursor-pointer">Details</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TaCourseDashboard;
