import React from 'react';
import { gql, useMutation } from '@apollo/client';

// Define the GraphQL mutation
const GENERATE_CSV_MUTATION = gql`
  mutation GenerateCsv {
    generateCsv
  }
`;

const CrateCsv = () => {
  const [generateCsv, { data, loading, error }] = useMutation(GENERATE_CSV_MUTATION);

  const handleGenerateCsv = async () => {
    try {
      const response = await generateCsv();
      if (response.data.generateCsv) {
        console.log('CSV generated:', response.data.generateCsv);
        // Optionally handle the response, e.g., show a success message or prompt a download
      }
    } catch (err) {
      console.error('Error generating CSV:', err);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateCsv} disabled={loading}>
        {loading ? 'Generating CSV...' : 'Generate CSV'}
      </button>
      {error && <p>Error generating CSV: {error.message}</p>}
      {data && <p>CSV generated successfully: {data.generateCsv}</p>}
    </div>
  );
};

export default CrateCsv;
