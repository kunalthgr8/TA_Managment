import React, { useState } from "react";
import { Button, Input } from "../index";
import NoLeave from "../../assets/NoLeaves.svg";

const TaLeaves = () => {
  const [leavesRequest, setLeavesRequest] = useState("");

  const handleInputChange = (e) => {
    setLeavesRequest(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5 w-full">
      <SectionTitle title="Request For a Leave" />
      <LeaveRequestForm
        leavesRequest={leavesRequest}
        onInputChange={handleInputChange}
      />
      <SectionTitle title="History of Leaves" />
      <LeaveHistory />
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <h1 className="text-white font-bold tracking-wider text-xl m-5 flex justify-start w-3/4">
    {title}
  </h1>
);

const LeaveRequestForm = ({ leavesRequest, onInputChange }) => (
  <div className="flex flex-col justify-start items-center bg-slate-100 rounded-lg p-5 gap-4 w-2/3">
    <div className="flex flex-col justify-center items-center w-4/5">
      <Input
        placeholder="Reason"
        className="rounded-md bg-white"
        label="Reason"
        onChange={onInputChange}
        value={leavesRequest}
      />
    </div>
    <div className="flex flex-col justify-center items-center w-4/5">
      <Button className="bg-custom-black font-bold rounded-3xl px-4 py-2 text-white">
        Send
      </Button>
    </div>
  </div>
);

const LeaveHistory = () => (
  <div className="flex flex-col md:flex-row justify-center items-center bg-slate-100 rounded-lg p-2 gap-4 w-2/3">
    <div className="flex flex-col md:flex-row justify-center items-center w-full">
      <div className="flex flex-col md:flex-row justify-start items-center w-full gap-5 p-4">
        <img
          className="rounded-full border border-custom-gray shadow-sm"
          src={NoLeave}
          alt="Profile"
          width={"100px"}
        />
        <div className="text-custom-purple flex flex-col justify-center items-center gap-5">
          <p className="text-sm font-semibold text-custom-black">
            Dear Sir, Please approve my leave for xyz reason......
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TaLeaves;
