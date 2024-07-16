import { gql } from "@apollo/client";

export const GET_FACULTY_LEAVES = gql`
    query getLeave($input: FacultyleaveInput) {
        getLeave(input: $input) {
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