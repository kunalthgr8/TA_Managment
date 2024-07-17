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
        approved: [String]
    }

    type UserCourseList {
        idNumber: ID!
        name: String!
        email: String!
        phoneNumber: String!
        gender: String
        bio: String
        refreshToken: String
        accessToken: String
        approved: Boolean
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

    type TAListApiResponse {
        status: Int
        message: String
        data: [UserCourseList]
    }

    extend type Query {
        getAllUsers(courseId: ID!): TAListApiResponse
        getUser(idNumber: ID!): User
        getUserCourses(idNumber: ID!): ApiResponse
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

    input ChangePasswordInput {
        idNumber: ID!
        oldPassword: String!
        newPassword: String!
    }

    extend type Mutation {
        registerUser(input: RegisterInput!): ApiResponse
        updateUser(input: UpdateInput!): ApiResponse
        deleteUser(idNumber: ID!): ApiResponse
        generateAccessAndRefreshToken(idNumber: ID!): AuthPayload
        loginUser(input: LoginInput!): ApiResponse
        logoutUser(idNumber: ID!): ApiResponse
        changePassword(input: ChangePasswordInput!): ApiResponse
    }
`;

export default userTypeDefs;
