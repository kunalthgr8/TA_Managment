import React, { useEffect } from "react";
import { Card, Loader } from "../index";
import cat from "../../assets/cat.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wait from "../../assets/wait.svg";
import { GET_ALL_USERS } from "../../graphql/queries/faculty.query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import wait from "../../assets/wait.svg";

function TaList() {
  const { courseId } = useParams();
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFaculty) {
      navigate("/");
    }
  }, [isFaculty]);

  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: {
      courseId: courseId,
    },
  });
  console.log("Get all TAs ",data);
  useEffect(() => {}, [data]);
  if (loading)
    return (
      <div className="flex justify-center self-center gap-10 w-full mt-10">
        <Loader />
      </div>
    );
  if (error) return <p>Error loading users</p>;
  return (
    <>
      {!isFaculty && <img src={Wait} alt="Waittt" />}
      {isFaculty && (
        <div className="flex flex-col justify-center self-center w-4/5">
          <div className="flex w-full xl:w-3/4 flex-col justify-center self-center mt-8 p-10 pt-0 gap-2">
            {data.getAllUsers.data.map((item) => (
              <div
                key={item.idNumber}
                className="flex w-full flex-col justify-center self-center"
              >
                <h1 className="font-bold text-custom-gray tracking-wider text-base mb-2">
                  Machine Learning
                </h1>
                <div className="flex justify-center self-center w-full">
                  <Card
                    className=" w-full sm:w-4/5 md:w-full sm:m-5 shadow-xl rounded-3xl"
                    src={ item.profilePicture ||cat}
                    user={{
                      name: item.name,
                      email: item.email,
                      id: item.idNumber,
                      contact: item.phoneNumber,
                      approved: item.approved || false,
                      courseId: courseId,
                    }}
                  />
                </div>
              </div>
            ))}
            {data.getAllUsers.data.length === 0 && (
              <div className="flex flex-col justify-center self-center mt-10 gap-10">
                <img src={wait} alt="Wait for a day" width="200px" className="flex justify-center self-center" />
                <h1 className="font-bold text-custom-gray tracking-wider text-base mb-2">
                  No TAs found, Kindly wait for a day
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TaList;
