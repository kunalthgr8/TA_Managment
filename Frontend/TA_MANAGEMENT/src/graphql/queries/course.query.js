import { gql } from '@apollo/client';

export const GET_ALL_COURSES = gql`
    query getCourses($idNumber: ID!) {
        getCourses(idNumber: $idNumber) {
            status
            message
            data {
                idNumber
                courses {
                    courseName
                    courseCode
                    semester
                    skills
                    status
                    selectedTAs
                }
            }
        }
    }
`;