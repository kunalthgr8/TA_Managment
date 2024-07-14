const userTypeDefs = `
    type User {
        idNumber: ID!
        name: String!
        email: String!
        phoneNumber: String!
        gender: String
        bio: String
        refreshToken: String
        accessToken: String
    }

    type AuthPayload {
        accessToken: String
        refreshToken: String
        user: User
    }

    type ApiResponse {
        status: Int
        message: String
        data: User
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

    input LoginInput {
        idNumber: ID!
        password: String!
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
        registerUser(input: RegisterInput!): ApiResponse
        updateUser(input: UpdateInput!): ApiResponse
        deleteUser(idNumber: ID!): ApiResponse
        generateAccessAndRefreshToken(idNumber: ID!): AuthPayload
        loginUser(input: LoginInput!): ApiResponse
        logoutUser(idNumber: ID!): ApiResponse
    }
`;

export default userTypeDefs;
