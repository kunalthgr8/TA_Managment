
import React, { useState } from "react";
import { Button, Input } from "../index";
import NoLeave from "../../assets/NoLeaves.svg";
import { useEffect } from "react";
import { useQuery,useMutation } from "@apollo/client";
import {CREATE_TA_LEAVE} from "../../graphql/mutations/taleave.mutations";
import { GET_LEAVES } from "../../graphql/queries/taleave.query";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TaLeaves = () => {
  const { courseId } = useParams();
  const [leavesRequest, setLeavesRequest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaves, setLeaves] = useState([]);

  const [getleaves,setGetLeaves] = useState([{
    duration: 2,
    reason: "Family event",
    startDate: "2024-07-10",
    endDate: "2024-07-12",
    status: "Approved",
  },]);

  const userData = useSelector((state) => state.auth.user);

  const [createLeave, { data }] = useMutation(CREATE_TA_LEAVE,
    {refetchQueries: [
          { query: GET_LEAVES, 
            variables: { input: 
              {
                courseId: "CS101",
                idNumber: userData.idNumber,
              },
            } 
          },
        ],
      }
    );

  const {data: leavesData, error: leavesError, loading: leavesLoading} = useQuery(GET_LEAVES,
    {
      variables: {
        input: {
          courseId: "CS101",
          idNumber: userData.idNumber,
        },
      },
    }
  );

  console.log("LeavesData:",leavesData)

  useEffect(() => {
    if (leavesData && 
      leavesData?.getleaveTA && 
      leavesData?.getleaveTA?.data && 
      leavesData?.getleaveTA?.data?.leave && 
      leavesData?.getleaveTA?.data?.leave[0]?.leaves) 
      {
        setGetLeaves(leavesData.getleaveTA.data.leave[0].leaves);
        console.log("LEAVESDATA:",leavesData)
        console.log("Leaves data:", leavesData?.getleaveTA?.data?.leave[0]?.leaves);
      }
  }, [leavesData]);

  const handleInputChange = (e) => {
    setLeavesRequest(e.target.value);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Calculate difference in days
    return daysDiff;
  };

  const handleSubmit = () => {
    setLeaves([
      {
        startDate: startDate,
        endDate: endDate,
        duration: toString(calculateDuration(startDate, endDate)),
        reason: leavesRequest,
        status: "PENDING",
        id: uuidv4(),
      },
    ]);
  };

  useEffect(() => {
    if (leaves.length > 0) {
      const createleaveInBackend = async () => {
        const response = await createLeave({
          variables: {
            input: {
              courseId: "CS101",
              idNumber: userData.idNumber,
              leaves: leaves,
            },
          },
        });
        console.log(response);
        if (response.data.createLeave.status === 201) {
          // setGetLeaves(response.data.createLeave.data.leave[0].leaves);
          setLeaves([]);
          setLeavesRequest("");
          setStartDate("");
          setEndDate("");
        }
      };
      createleaveInBackend();
    }
  }, [leaves, createLeave, userData.idNumber]);

  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    else setEndDate(value);
  };

  console.log("GetLeaves..............", getleaves);
  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5 w-full">
      <SectionTitle title="Request For a Leave" />
      <LeaveRequestForm
        leavesRequest={leavesRequest}
        onInputChange={handleInputChange}
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
        handleSubmit={handleSubmit}
      />
      <SectionTitle title="History of Leaves" />
      <LeaveHistory getleaves={getleaves} />
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
  handleSubmit,
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
      <Button onClick = {handleSubmit} className="bg-custom-black font-bold rounded-3xl px-4 py-2 text-white">
        Send
      </Button>
    </div>
  </div>
);

const LeaveHistory = ({getleaves}) => {
  
  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 rounded-lg p-2 gap-4 w-2/3 mb-10">
      {Array.isArray(getleaves) && getleaves.length >0?(
        getleaves.map((leave,index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center w-full gap-5 p-4 bg-white shadow rounded-md"
          >
            <img
              className="rounded-full border border-custom-gray shadow-sm"
              src={NoLeave}
              alt="Profile"
              width={"100px"}
            />
            <div className="flex flex-col justify-start items-start w-full gap-2">
              <p className="text-sm font-semibold text-custom-black">
                {leave.reason}
              </p>
              <p className="text-sm text-custom-black">
                Start Date: {leave.startDate}
              </p>
              <p className="text-sm text-custom-black">
                End Date: {leave.endDate}
              </p>
              <p className="text-sm text-custom-black">Status: {leave.status}</p>
            </div>
          </div>
        ))
      ):(
        <p>No leaves available</p>
      )} 
    </div>
  );
};

export default TaLeaves;
