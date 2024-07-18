const academicsTypeDef = `
    extend type Mutation {
        trainModel: String
        getIdNumbersByCourse(courseName: String!): [String]
    }
    
`;

export default academicsTypeDef;
