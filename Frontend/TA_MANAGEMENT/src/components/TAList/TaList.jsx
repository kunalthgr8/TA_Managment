import React from "react";
import { Card } from "../index";
import cat from "../../assets/cat.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wait from "../../assets/wait.svg";
import { GET_ALL_USERS } from "../../graphql/queries/faculty.query";
import { useQuery } from "@apollo/client";

function TaList() {
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  const navigate = useNavigate();
  if (!isFaculty) {
    navigate("/");
  }
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  if (loading) return <img src={Wait} alt="Loading" />;
  if (error) return <p>Error loading users</p>;
  return (
    <>
      {!isFaculty && <img src={Wait} alt="Waittt" />}
      {isFaculty && (
        <div className="flex flex-col justify-center self-center w-4/5">
          <div className="flex w-full xl:w-3/4 flex-col justify-center self-center mt-8 p-10 pt-0 gap-2">
            {data.getAllUsers.map((item) => (
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
                    src={cat}
                    user={{
                      name: item.name,
                      email: item.email,
                      id: item.idNumber,
                      contact: item.phoneNumber,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TaList;
