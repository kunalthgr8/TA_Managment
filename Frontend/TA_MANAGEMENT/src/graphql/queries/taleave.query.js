import { gql } from "@apollo/client";

export const GET_LEAVES = gql`
    query getleaveTA($input: TAleaveInput) {
        getleaveTA(input: $input) {
            status
            message
            data {
                courseId
                leave {
                    idNumber
                    leaves {
                        startDate
                        endDate
                        duration
                        reason
                        status
                    }
                }
            }
        }
    }
`;