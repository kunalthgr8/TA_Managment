import React from "react";
import NoLeave from "../../assets/NoLeaves.svg";
import { Button } from "../index";
import { useSelector } from "react-redux";

function Leaves() {
  const leavesRequest = 2; // Replace with actual data from state if needed
  const isFaculty = useSelector((state) => state.auth.isFaculty);

  const leaveRequests = [
    {
      id: 1,
      name: "Kunal Singla",
      email: "kunalsingla@iitbhilai.ac.in",
      reason: "Family event",
      startDate: "2024-07-10",
      endDate: "2024-07-12",
      status: "Pending",
    },
    {
      id: 2,
      name: "Another TA",
      email: "another.ta@iitbhilai.ac.in",
      reason: "Medical leave",
      startDate: "2024-07-15",
      endDate: "2024-07-18",
      status: "Pending",
    },
  ];

  const leaveHistory = [
    {
      id: 3,
      name: "Past TA",
      email: "past.ta@iitbhilai.ac.in",
      reason: "Conference",
      startDate: "2024-06-01",
      endDate: "2024-06-03",
      status: "Approved",
    },
    {
      id: 4,
      name: "Another Past TA",
      email: "another.past.ta@iitbhilai.ac.in",
      reason: "Vacation",
      startDate: "2024-05-15",
      endDate: "2024-05-20",
      status: "Declined",
    },
  ];

  const noLeaveRequestContent = (
    <div className="flex flex-col justify-center self-center mt-10 gap-5">
      <img src={NoLeave} alt="No Leave Request" width={"250px"} />
      <h1 className="text-white font-bold tracking-wider text-2xl text-center">
        No Leave Requests
      </h1>
    </div>
  );

  const leaveRequestContent = (
    <div className="flex flex-col justify-center self-center mt-10 gap-5 w-full">
      <h1 className="text-white font-bold tracking-wider text-xl m-5 flex justify-start self-center w-3/4">
        {leavesRequest} Leave Requests
      </h1>
      {leaveRequests.map((leave) => (
        <div
          key={leave.id}
          className="flex flex-col md:flex-row justify-center self-center bg-slate-100 rounded-lg p-5 gap-4 w-4/5 mb-4"
        >
          <div className="flex flex-col md:flex-row justify-center self-center w-full">
            <div className="flex flex-col justify-center self-center w-full md:flex-row gap-5 md:justify-evenly p-4">
              <img
                className="rounded-full flex justify-center self-center border border-custom-gray shadow-sm"
                src={NoLeave}
                alt="Profile"
                width={"100px"}
              />
              <div className="text-custom-purple flex flex-col justify-center self-center gap-2">
                <div className="flex flex-col">
                  <h1 className="text-lg lg:text-2xl font-bold text-custom-black">
                    {leave.name}
                  </h1>
                  <p className="text-xs lg:text-xs font-medium text-custom-black">
                    {leave.email}
                  </p>
                </div>

                <div className="flex gap-10">
                  <p className="text-sm text-custom-black">
                    Start Date: {leave.startDate}
                  </p>
                  <p className="text-sm text-custom-black">
                    End Date: {leave.endDate}
                  </p>
                </div>
                <p className="text-sm font-semibold text-custom-black">
                  Dear Sir, Please approve my leave for {leave.reason}.
                </p>
                <p className="text-sm text-custom-black">
                  Status: {leave.status}
                </p>
              </div>
            </div>
            {isFaculty && (
              <div className="flex flex-col justify-center self-center mt-5 md:mt-0 md:flex-row w-full md:w-5/12 gap-2 md:gap-1 lg:gap-3">
                <Button
                  width="flex justify-center self-center w-full"
                  className="bg-green-500 font-bold rounded-3xl p-2 w-11/12 text-white"
                >
                  Approve
                </Button>
                <Button
                  width="flex justify-center self-center w-full"
                  className="bg-red-500 font-bold rounded-3xl p-2 w-11/12 text-white"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const leaveHistoryContent = (
    <div className="flex flex-col justify-center self-center mt-10 gap-5 w-full">
      <h1 className="text-white font-bold tracking-wider text-xl m-5 flex justify-start self-center w-3/4">
        Leave History
      </h1>
      <div className="flex flex-col justify-center items-center self-center bg-slate-100 rounded-lg p-2 pl-5 pr-5 pb-5 gap-4 w-4/5 mb-10">
        {leaveHistory.map((leave) => (
          <div
            key={leave.id}
            className={`flex flex-col md:flex-row justify-between items-center mt-3 w-full gap-5 p-4 bg-white shadow-xl border-2 rounded-md ${
              leave.status === "Approved"
                ? "border-green-500"
                : leave.status === "Declined"
                ? "border-red-500"
                : "border-custom-gray"
            }`}
          >
            <div className="flex justify-center self-center bg-slate-100 p-4 rounded-lg ">
              <img
                className="rounded-full border border-custom-gray shadow-sm"
                src={NoLeave}
                alt="Profile"
                width={"120px"}
              />
            </div>
            <div className="flex flex-col justify-start items-start w-4/5 gap-2 bg-slate-100 p-4 pl-8 rounded-lg">
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-2xl font-bold text-custom-black">
                  {leave.name}
                </h1>
                <p className="text-xs lg:text-xs font-medium text-custom-black">
                  {leave.email}
                </p>
              </div>

              <div className="flex gap-10">
                <p className="text-sm text-custom-black">
                  Start Date: {leave.startDate}
                </p>
                <p className="text-sm text-custom-black">
                  End Date: {leave.endDate}
                </p>
              </div>
              <p className="text-sm font-semibold text-custom-black">
                Dear Sir, {leave.reason}.
              </p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-4/5">
      {leavesRequest === 0 ? noLeaveRequestContent : leaveRequestContent}
      {leaveHistory.length > 0 && leaveHistoryContent}
    </div>
  );
}

export default Leaves;
