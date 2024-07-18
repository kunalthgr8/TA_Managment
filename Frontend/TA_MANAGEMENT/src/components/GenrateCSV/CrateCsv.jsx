import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "../index";

// Define the GraphQL mutation
const GENERATE_CSV_MUTATION = gql`
  mutation GenerateCsv {
    generateCsv
  }
`;

const CrateCsv = () => {
  const [generateCsv, { data, loading, error }] = useMutation(
    GENERATE_CSV_MUTATION
  );

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

  return (
    <div className="flex flex-col justify-center self-center mt-10 gap-5">
      <Button
        onClick={handleGenerateCsv}
        disabled={loading}
        className="text-custom-purple w-full bg-white rounded-xl p-4 font-bold border border-custom-purple  shadow-md"
      >
        {loading ? "Generating CSV..." : "Generate CSV"}
      </Button>
      {error && <p className="text-red-500" >Error generating CSV: {error.message}</p>}
      {data && <p className="text-white">{data.generateCsv}</p>}
    </div>
  );
};

export default CrateCsv;
