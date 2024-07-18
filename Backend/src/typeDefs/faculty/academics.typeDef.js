const academicsTypeDef = `
type trainModelApiResponse{
    status: String
    message: String

}    

extend type Mutation {
        trainModel: trainModelApiResponse
        getIdNumbersByCourse(courseName: String!,courseId: String): trainModelApiResponse
    }
    
`;

export default academicsTypeDef;
