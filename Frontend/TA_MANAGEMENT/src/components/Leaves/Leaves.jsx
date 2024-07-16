import {React,useState,useEffect} from "react";
import NoLeave from "../../assets/NoLeaves.svg";
import { Button } from "../index";
import { useSelector } from "react-redux";
import { useQuery,useMutation } from "@apollo/client";
import { GET_FACULTY_LEAVES } from "../../graphql/queries/facultyleave.query";
// import { set } from "mongoose";
import { LEAVE_APPROVE } from "../../graphql/mutations/facultyleave.mutations";


function Leaves() {
  // const leavesRequest = 2; // Replace with actual data from state if needed
  const [leavesRequest, setLeavesRequest] = useState(0);
  const isFaculty = useSelector((state) => state.auth.isFaculty);
  const userData = useSelector((state) => state.auth.user);
  const [leaveRequests, setLeaveRequests] = useState([{
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
  },]);

  const [leaveHistory, setLeaveHistory] = useState([
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
  ])

  const { data, loading, error } = useQuery(GET_FACULTY_LEAVES, {
    variables: { input: { courseId: "CS101", idNumber: userData.idNumber }     
    },

  });
  
  console.log("Data Leaves:",data);
  useEffect(() => {
    const notapproved = []
    const approved = []
    if (data?.getLeave?.data?.leave) {
      data.getLeave.data.leave.map((leave) => {
        //apply filter on basis of status if PENDING add to leaveRequests else to leaveHistory
        const pending = leave.leaves.filter((leave) => leave.status === "PENDING");
        const history = leave.leaves.filter((leave) => leave.status !== "PENDING");
        const idNumber = leave.idNumber;
        const updatedPending = pending.map((leave) => {
          return {
            idNumber: idNumber,
            ...leave}
        }
        );
        const updatedHistory = history.map((leave) => {
          return {
            idNumber: idNumber,
            ...leave}
        }
        );

        notapproved.push(...updatedPending);
        approved.push(...updatedHistory);

      })
      setLeaveRequests(notapproved );
      setLeavesRequest(notapproved.length);
      setLeaveHistory(approved);
      // setLeaveHistory(data.getLeave.data.leave);
    }
  }, [data]);


  const [leaveApprove,{data:leavedata}] = useMutation(LEAVE_APPROVE,
    //  {
    //     variables: { input: { courseId, idNumber, id }},
    //   }
      {refetchQueries: [
        { query: GET_FACULTY_LEAVES, 
          variables: { input: 
            {
              courseId: "CS101",
              idNumber: "12140970", //idNumber  is not required here that's why some random static idNumber is used
            },
          } 
        },
      ],
    }
  );

  const handleApprove = async (courseId,idNumber,id) => {
    console.log("Approve", id);
    const flag = "APPROVED";
    const response = await leaveApprove({
      variables: { input: { courseId, idNumber, id , flag}},
    });
    console.log("Response of leave approve:",response);

  };

  const handleReject = async (courseId,idNumber,id) => {
    console.log("Rejected", id);
    const flag = "REJECTED";
    const response = await leaveApprove({
      variables: { input: { courseId, idNumber, id , flag}},
    });
    console.log("Response of leave approve:",response);

  };





  // const leaveRequests = [
  //   {
  //     id: 1,
  //     name: "Kunal Singla",
  //     email: "kunalsingla@iitbhilai.ac.in",
  //     reason: "Family event",
  //     startDate: "2024-07-10",
  //     endDate: "2024-07-12",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     name: "Another TA",
  //     email: "another.ta@iitbhilai.ac.in",
  //     reason: "Medical leave",
  //     startDate: "2024-07-15",
  //     endDate: "2024-07-18",
  //     status: "Pending",
  //   },
  // ];

  // const leaveHistory = [
  //   {
  //     id: 3,
  //     name: "Past TA",
  //     email: "past.ta@iitbhilai.ac.in",
  //     reason: "Conference",
  //     startDate: "2024-06-01",
  //     endDate: "2024-06-03",
  //     status: "Approved",
  //   },
  //   {
  //     id: 4,
  //     name: "Another Past TA",
  //     email: "another.past.ta@iitbhilai.ac.in",
  //     reason: "Vacation",
  //     startDate: "2024-05-15",
  //     endDate: "2024-05-20",
  //     status: "Declined",
  //   },
  // ];

  const noLeaveRequestContent = (
    <div className="flex flex-col justify-center self-center mt-10 gap-5">
      <img src={NoLeave} alt="No Leave Request" width={"250px"} className="flex justify-center self-center" />
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
          key={leaveRequests.id}
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
                    {leave.idNumber}
                  </h1>
                  {/* <p className="text-xs lg:text-xs font-medium text-custom-black">
                    {leave.email}
                  </p> */}
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
                   {leave.reason}.
                </p>
                <p className="text-sm text-custom-black">
                  Status: {leave.status}
                </p>
              </div>
            </div>
            {isFaculty && (
              <div className="flex flex-col justify-center self-center mt-5 md:mt-0 md:flex-row w-full md:w-5/12 gap-2 md:gap-1 lg:gap-3">
                <Button
                  onClick={() => handleApprove("CS101",leave.idNumber,leave.id)}
                  width="flex justify-center self-center w-full"
                  className="bg-green-500 font-bold rounded-3xl p-2 w-11/12 text-white"
                >
                  Approve
                </Button>
                <Button
                onClick={() => handleReject("CS101",leave.idNumber,leave.id)}
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
            key={leaveHistory.id}
            className={`flex flex-col md:flex-row justify-between items-center mt-3 w-full gap-5 p-4 bg-white shadow-xl border-2 rounded-md ${
              leave.status === "APPROVED"
                ? "border-green-500"
                : leave.status === "REJECTED"
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
                  {leave.idNumber}
                </h1>
                {/* <p className="text-xs lg:text-xs font-medium text-custom-black">
                  {leave.email}
                </p> */}
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
                    leave.status === "APPROVED"
                      ? "text-green-500"
                      : leave.status === "REJECTED"
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
