const userTypeDefs = `
    type User {
        idNumber: ID!
        name: String!
        email: String!
        phoneNumber: String!
        password: String!
        gender: String
        bio: String
        refreshToken: String
    }

    type AuthPayload {
        accessToken: String
        refreshToken: String
        user: User
    }

    extend type Query {
        getAllUsers: [User]
        getUser(idNumber: ID!): User
    }

    extend type Mutation {
        userRegistration(idNumber: ID!, name: String!, email: String!, password: String!, phoneNumber: String!): User
        updateUser(idNumber: ID!, name: String, email: String, password: String, phoneNumber: String, gender: String, bio: String): User
        deleteUser(idNumber: ID!): User
        generateAccessAndRefreshToken(idNumber: ID!): AuthPayload
        userLogin(idNumber:ID!,password:String!): AuthPayload
    }
`;

export default userTypeDefs;
