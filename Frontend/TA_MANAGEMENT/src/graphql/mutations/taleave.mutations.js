import { gql } from "@apollo/client";

export const CREATE_TA_LEAVE = gql`
    mutation createLeave($input: leave) {
        createLeave(input: $input) {
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
