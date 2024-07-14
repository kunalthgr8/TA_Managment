import React from "react";
import { Card } from "../index";
import cat from "../../assets/cat.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wait from "../../assets/wait.svg"
function TaList() {
  const items = [1, 2, 3, 4];
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  const navigate = useNavigate();
  if (!isFaculty) {
    navigate("/");
  }
  return (
    <>
    {!isFaculty && (
      <img src={Wait} alt="Waittt" />
    )}
      {isFaculty && (
        <div className="flex flex-col justify-center self-center w-4/5">
          <div className="flex w-full xl:w-3/4 flex-col justify-center self-center mt-8 p-10 pt-0 gap-2">
            {items.map((item) => (
              <div
                key={item}
                className="flex w-full flex-col justify-center self-center"
              >
                <h1 className="font-bold text-custom-gray tracking-wider text-base mb-2">
                  Machine Learning
                </h1>
                <div className="flex justify-center self-center w-full">
                  <Card
                    className=" w-full sm:w-4/5 md:w-full sm:m-5 shadow-xl rounded-3xl"
                    src={cat}
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
