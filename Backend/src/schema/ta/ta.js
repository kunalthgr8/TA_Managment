const userTypeDefs = `
    type User {
        idNumber: ID!
        name: String!
        email: String!
        phoneNumber: String!
        password: String!
        gender: String!
        bio: String!

    }
    extend type Query {
        getallUsers: [User]
        getUser(idNumber: ID!): [User]
    }
    extend type Mutation {
        addUser(idNumber: String!, name: String! , email: String!, password:String, phoneNumber: String!, gender: String!, bio: String!): User
    }
`;

export default userTypeDefs;
