import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "../index";
import {
  GENERATE_CSV_MUTATION,
  TRAIN_MODEL_MUTATION,
} from "../../graphql/mutations/acadmeic.mutation.js";


const CrateCsv = () => {
  const [generateCsv, { data, loading, error }] = useMutation(
    GENERATE_CSV_MUTATION
  );
  const [
    trainModel,
    { data: trainDat, loading: trainLoading, error: trainError },
  ] = useMutation(TRAIN_MODEL_MUTATION);

  const handleGenerateCsv = async () => {
    try {
      const response = await generateCsv();
      if (response.data.generateCsv) {
        console.log("CSV generated:", response.data.generateCsv);
        // Optionally handle the response, e.g., show a success message or prompt a download
      }
    } catch (err) {
      console.error("Error generating CSV:", err);
    }
  };

  const handleTrainModel = async () => {
    try {
      const response = await trainModel();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center self-center mt-10 gap-5">
      <Button
        onClick={handleGenerateCsv}
        disabled={loading}
        className="text-custom-purple w-full bg-white rounded-xl p-4 font-bold border border-custom-purple  shadow-md"
      >
        {loading ? "Generating CSV..." : "Generate CSV"}
      </Button>
      {error && (
        <p className="text-red-500">Error generating CSV: {error.message}</p>
      )}
      {data && (
        <>
          <Button
            onClick={handleTrainModel}
            disabled={trainLoading}
            className="text-custom-purple w-full bg-white rounded-xl p-4 font-bold border border-custom-purple  shadow-md"
          >
            {loading ? "Training Model..." : "Train The Model"}
          </Button>
        </>
      )}
    </div>
  );
};

export default CrateCsv;
