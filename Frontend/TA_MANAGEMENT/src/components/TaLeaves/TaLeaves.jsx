import React, { useState } from "react";
import { Button, Input } from "../index";
import NoLeave from "../../assets/NoLeaves.svg";

const TaLeaves = () => {
  const [leavesRequest, setLeavesRequest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleInputChange = (e) => {
    setLeavesRequest(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    else setEndDate(value);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5 w-full">
      <SectionTitle title="Request For a Leave" />
      <LeaveRequestForm
        leavesRequest={leavesRequest}
        onInputChange={handleInputChange}
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
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

const LeaveRequestForm = ({
  leavesRequest,
  onInputChange,
  startDate,
  endDate,
  onDateChange,
}) => (
  <div className="flex flex-col justify-start items-center bg-slate-100 rounded-lg p-5 gap-4 w-2/3">
    <div className="flex flex-col justify-center items-center w-4/5">
      <Input
        placeholder="Reason"
        className="rounded-md bg-white"
        label="Reason"
        onChange={onInputChange}
        value={leavesRequest}
      />
      <div className="flex flex-row justify-center items-center w-full gap-10 mt-5">
        <Input
          type="date"
          name="startDate"
          value={startDate}
          placeholder="Start Date"
          className="rounded-md bg-white"
          label="Start Date"
          onChange={onDateChange}
        />
        <Input
          type="date"
          name="endDate"
          value={endDate}
          placeholder="End Date"
          className="rounded-md bg-white"
          label="End Date"
          onChange={onDateChange}
        />
      </div>
    </div>
    <div className="flex flex-col justify-center items-center w-4/5">
      <Button className="bg-custom-black font-bold rounded-3xl px-4 py-2 text-white">
        Send
      </Button>
    </div>
  </div>
);

const LeaveHistory = () => {
  const leaves = [
    {
      id: 1,
      reason: "Family event",
      startDate: "2024-07-10",
      endDate: "2024-07-12",
      status: "Approved",
    },
    {
      id: 2,
      reason: "Medical leave",
      startDate: "2024-07-15",
      endDate: "2024-07-18",
      status: "Pending",
    },
    {
      id: 3,
      reason: "Personal leave",
      startDate: "2024-07-20",
      endDate: "2024-07-22",
      status: "Declined",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center self-center bg-slate-100 rounded-lg p-2 pl-5 pr-5 gap-4 w-2/3 mb-10">
      {leaves.map((leave) => (
        <div
          key={leave.id}
          className="flex flex-col md:flex-row justify-between items-center mt-3 w-full gap-5 p-4 bg-white shadow-xl rounded-md"
        >
          <div className="flex justify-center self-center bg-slate-100 p-4 rounded-lg ">
            <img
              className="rounded-full border border-custom-gray shadow-sm"
              src={NoLeave}
              alt="Profile"
              width={"120px"}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-4/5 gap-2 bg-slate-100 p-8 rounded-lg">
            <div className="flex flex-row gap-5">
              <p className="text-sm text-custom-black">
                Start Date: {leave.startDate}
              </p>
              <p className="text-sm text-custom-black">
                End Date: {leave.endDate}
              </p>
            </div>
            <p className="text-sm text-custom-black">
              Status:{" "}
              <span
                className={`font-bold shadow-sm ${
                  leave.status === "Approved"
                    ? "text-green-500"
                    : leave.status === "Declined"
                    ? "text-red-500"
                    : "text-custom-gray"
                }`}
              >
                {leave.status}
              </span>
            </p>
            <p className="text-sm font-semibold text-custom-black">
              {leave.reason}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaLeaves;
