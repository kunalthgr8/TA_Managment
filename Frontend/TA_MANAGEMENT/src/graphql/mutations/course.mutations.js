import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
    mutation createCourse($input: CourseDetailInput!) {
        addCourse(input: $input) {
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


