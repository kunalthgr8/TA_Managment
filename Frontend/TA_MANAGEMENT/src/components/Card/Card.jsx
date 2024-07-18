import React from "react";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";

function Card({
  width = "100px",
  height = "100px",
  className = "",
  src = "",
  user = {
    name: "Name",
    email: "Email",
    id: "IdNumber",
    contact: "Contact",
    approved: false,
    courseId: "",
  },
}) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/taPublicView/${user.id}`);
  };

  const handleApproveClick = () => {
    navigate(`/approveTa/${user.id}/${user.courseId}`);
  };

  return (
    <div className={`flex flex-col md:flex-row justify-center self-center bg-slate-100 rounded-lg p-5 gap-4 w-4/5 ${className}`}>
      <div className="flex flex-col md:flex-row justify-center self-center w-full">
        <div className="flex flex-col justify-center self-center w-full md:flex-row gap-5 md:justify-evenly p-4">
          <img
            className="rounded-full flex justify-center self-center border border-custom-gray shadow-sm"
            src={src}
            alt="Profile"
            style={{ width, height }}
          />
          <div className="text-custom-purple flex flex-col justify-center self-center gap-5">
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-2xl font-bold text-custom-black">
                {user.name}
              </h1>
              <p className="text-xs lg:text-xs font-medium text-custom-black">
                {user.email}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-xs font-medium text-custom-black">
                ID Number: {user.id}
              </h1>
              <p className="text-xs lg:text-xs font-medium text-custom-black">
                Contact Number: {user.contact}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center self-center mt-5 md:mt-0 md:flex-row w-full md:w-5/12 gap-2 md:gap-1 lg:gap-5">
          <Button
            width="flex justify-center self-center w-full"
            className="bg-custom-gray font-bold rounded-3xl p-2 w-11/12 text-custom-purple shadow-lg"
            onClick={handleDetailsClick}
          >
            Details
          </Button>
          {!user.approved && (
            <Button
              width="flex justify-center self-center w-full"
              className="bg-green-500 font-bold rounded-3xl p-2 w-11/12 text-white shadow-lg"
              onClick={handleApproveClick}
            >
              Approve
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
