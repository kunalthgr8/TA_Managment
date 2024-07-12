const userTypeDefs = `
    type User {
        idNumber: ID!
        name: String!
        email: String!
        phoneNumber: String!
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

    input RegisterInput {
        idNumber: ID!
        name: String!
        email: String!
        password: String!
        phoneNumber: String!
    }

    input UpdateInput {
        idNumber: ID!
        name: String
        email: String
        password: String
        phoneNumber: String
        gender: String
        bio: String
    }

    extend type Mutation {
        registerUser(input: RegisterInput!): User
        updateUser(input: UpdateInput!): User
        deleteUser(idNumber: ID!): User
        generateAccessAndRefreshToken(idNumber: ID!): AuthPayload
        loginUser(idNumber: ID!, password: String!): AuthPayload
    }
`;

export default userTypeDefs;
