import { gql } from '@apollo/client';

export const LEAVE_APPROVE = gql`
    mutation leaveApprove($input: FacultyLeaveApprove) {
        leaveApprove(input: $input) {
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
                        id
                    }
                }
            }
        }
    }
`;