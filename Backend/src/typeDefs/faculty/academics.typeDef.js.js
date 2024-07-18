const academicsTypeDef = `
    extend type Mutation {
        trainModel: String
        getIdNumbersByCourse(courseName: String!,courseId: String): [String]
    }
    
`;

export default academicsTypeDef;
