import { gql } from '@apollo/client';

export const GENERATE_CSV_MUTATION = gql`
  mutation GenerateCsv {
    generateCsv
  }
`;
