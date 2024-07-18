import { gql } from '@apollo/client';

export const GENERATE_CSV_MUTATION = gql`
  mutation GenerateCsv {
    generateCsv
  }

`;

export const TRAIN_MODEL_MUTATION = gql`
  mutation TrainModel {
    trainModel{
      status
      message
    }
  }

`;

export const PREDICT_MUTATION = gql`
  mutation Predict($courseName: String!, $courseId: String!) {
    getIdNumbersByCourse(courseName: $courseName,courseId:$courseId ){
      status
      message
    }
  }

`;
