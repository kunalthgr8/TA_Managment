import React from "react";
import NoLeave from "../../assets/NoLeaves.svg";
import { Button } from "../index";
import { useSelector } from "react-redux";

function Leaves() {
  const leavesRequest = 2;
  const isFaculty = useSelector((state) => state.auth.isFaculty);

  const noLeaveRequestContent = (
    <div className="flex flex-col justify-center self-center mt-10 gap-5">
      <img src={NoLeave} alt="No Leave Request" width={"250px"} />
      <h1 className="text-white font-bold tracking-wider text-2xl text-center">
        No Leaves Request
      </h1>
    </div>
  );

  const leaveRequestContent = (
    <div className="flex flex-col justify-center self-center mt-10 gap-5 w-full">
      <h1 className="text-white font-bold tracking-wider text-xl m-5 flex justify-start self-center w-3/4 ">
        2 Leaves Request
      </h1>
      <div className="flex flex-col md:flex-row justify-center self-center bg-slate-100 rounded-lg p-5 gap-4 w-4/5">
        <div className="flex flex-col md:flex-row justify-center self-center w-full">
          <div className="flex flex-col justify-center self-center w-full md:flex-row gap-5 md:justify-evenly p-4">
            <img
              className="rounded-full flex justify-center self-center border border-custom-gray shadow-sm"
              src={NoLeave}
              alt="Profile"
              width={"100px"}
            />
            <div className="text-custom-purple flex flex-col justify-center self-center gap-5">
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-2xl font-bold text-custom-black">
                  Kunal Singla
                </h1>
                <p className="text-xs lg:text-xs font-medium text-custom-black">
                  kunalsingla@iitbhilai.ac.in
                </p>
              </div>
              <p className="text-sm font-semibold text-custom-black ">
                Dear Sir, Please approve my leave for xyz reason......{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center self-center mt-5 md:mt-0  md:flex-row w-full md:w-5/12  gap-2 md:gap-1 lg:gap-5">
            <Button
              width="flex justify-center self-center w-full "
              className="bg-green-500  font-bold rounded-3xl p-2 w-11/12 text-white"
            >
              Approve
            </Button>
            <Button
              width="flex justify-center self-center w-full"
              className=" bg-red-500 font-bold rounded-3xl p-2 w-11/12 text-white"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>{leavesRequest === 0 ? noLeaveRequestContent : leaveRequestContent}</>
  );
}

export default Leaves;
