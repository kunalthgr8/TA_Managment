import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Input } from "../index";
import {
  GENERATE_CSV_MUTATION,
  TRAIN_MODEL_MUTATION,
  PREDICT_MUTATION,
} from "../../graphql/mutations/acadmeic.mutation.js";

const CreateCsv = () => {
  const [generateCsv, { data: csvData, loading: csvLoading, error: csvError }] = useMutation(GENERATE_CSV_MUTATION);
  const [trainModel, { data: trainData, loading: trainLoading, error: trainError }] = useMutation(TRAIN_MODEL_MUTATION);
  const [predict, { data: resultListData, loading: resultListLoading, error: resultListError }] = useMutation(PREDICT_MUTATION);
  const [dataTrain, setDataTrain] = useState(null);

  const [courseData, setCourseData] = useState({ courseName: "", courseId: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGenerateCsv = async () => {
    try {
      const response = await generateCsv();
      console.log("CSV generated:", response.data.generateCsv);
    } catch (err) {
      console.error("Error generating CSV:", err);
    }
  };

  const handleTrainModel = async () => {
    try {
      const response = await trainModel();
      setDataTrain(response);
      console.log("TrainData", trainData);
      console.log(response);
      console.log("DataTrain", dataTrain);
    } catch (error) {
      console.error("Error training model:", error);
    }
  };

  const handleSubmitCourse = async () => {
    if (!courseData.courseName || !courseData.courseId) {
      console.log("Please fill all the fields");
      return;
    }
    try {
      const response = await predict({ variables: { ...courseData } });
      console.log(response);
    } catch (error) {
      console.error("Error predicting course data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center self-center mt-10 gap-5">
      <Button
        onClick={handleGenerateCsv}
        disabled={csvLoading}
        className="text-custom-purple w-full bg-white rounded-xl p-4 font-bold border border-custom-purple shadow-md"
      >
        {csvLoading ? "Generating CSV..." : "Generate CSV"}
      </Button>
      {csvError && <p className="text-red-500">Error generating CSV: {csvError.message}</p>}

      {csvData && (
        <>
          <Button
            onClick={handleTrainModel}
            disabled={trainLoading}
            className="text-custom-purple w-full bg-white rounded-xl p-4 font-bold border border-custom-purple shadow-md"
          >
            {trainLoading ? "Training Model..." : "Train The Model"}
          </Button>
          {trainError && <p className="text-red-500">Error training model: {trainError.message}</p>}
        </>
      )}
      
      {csvData && dataTrain && (
        <>
          <Input
            type="text"
            name="courseId"
            placeholder="Course Code"
            className="bg-custom-gray text-black"
            onChange={handleChange}
            value={courseData.courseId}
            required
          />
          <Input
            type="text"
            name="courseName"
            placeholder="Course Name"
            className="bg-custom-gray text-black"
            onChange={handleChange}
            value={courseData.courseName}
            required
          />
          <Button
            className="text-custom-purple w-full bg-white rounded-xl p-4 font-bold border border-custom-purple shadow-md"
            onClick={handleSubmitCourse}
          >
            Submit
          </Button>
          {resultListError && <p className="text-red-500">Error predicting course data: {resultListError.message}</p>}
        </>
      )}
    </div>
  );
};

export default CreateCsv;
