import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import wait from "../../assets/wait.svg";
import { useSelector } from "react-redux";
import { GET_USER_COURSES } from "../../graphql/queries/faculty.query";

function TaCourseDashboard() {
  const userData = useSelector((state) => state.auth.user);
  const idNumber = userData.idNumber; 
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_USER_COURSES, {
    variables: { idNumber: idNumber }, // Replace with actual idNumber
  });

  console.log("Data: ", data);

  React.useEffect(() => {
    if (!queryLoading) {
      setLoading(false);
      if (queryError) {
        setError(queryError.message);
      } else if (data && data.getUserCourses) {
        setCourses(data.getUserCourses.data.approved);
      }
    }
  }, [data, queryLoading, queryError]);

  console.log("Courses: ", courses);

  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center self-center mt-10">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col justify-center self-center mt-10">
          <p>Error: {error}</p>
        </div>
      )}
      {!loading && !error && courses.length === 0 && (
        <div className="flex flex-col justify-center self-center mt-10">
          <img src={wait} alt="Wait till get Approval" width={"240px"} />
          <h1 className="flex flex-col justify-center self-center mt-10 text-white">
            Wait till Approval
          </h1>
        </div>
      )}
      {!loading && !error && courses.length > 0 && (
        <div className="w-full mt-10 flex flex-col justify-center self-center gap-5">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white flex justify-between self-center w-full md:w-3/4 rounded-lg p-5 shadow-xl"
              onClick={() => navigate(`/taLeaves/${course}`)}
            >
              <h1 className="font-bold text-base">{course}</h1>
              <p className="font-medium text-sm cursor-pointer">Details</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TaCourseDashboard;
