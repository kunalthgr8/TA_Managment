import User from '../../models/ta/ta.js';
import { AuthenticationError } from 'apollo-server';
import {
    validateAlphabet,
    validateEmail,
    validateIdNumber,
    validateNumber,
    validatePassword
} from '../../db/validation.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const generateTokens = async (user) => {
    if (!user) {
        throw new AuthenticationError('User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken, user };
};

const taResolver = {
    Query: {
        getAllUsers: async () => {
            try {
                return await User.find();
            } catch (error) {
                console.error("Error fetching users:", error);
                throw new Error("Error fetching users");
            }
        },
        getUser: async (parent, { idNumber }) => {
            try {
                const user = await User.findOne({ idNumber });
                if (!user) {
                    throw new ApiError(404, "User not found with this ID number");
                }
                return user;
            } catch (error) {
                console.error("Error fetching user by ID number:", error);
                throw new Error(error.message || "Error fetching user by ID number");
            }
        }
    },
    Mutation: {
        generateAccessAndRefreshToken: async (parent, { idNumber }) => {
            const user = await User.findOne({ idNumber });
            return generateTokens(user);
        },
        registerUser: async (parent, args, context) => {
            console.log("Register user args:", args);
            const { name, idNumber, email, password, phoneNumber } = args.input;
        
            try {
                if (!name || !idNumber || !email || !password || !phoneNumber) {
                    throw new ApiError(400, 'Please fill all fields');
                }
        
                validateAlphabet(name);
                validateEmail(email);
                validateNumber(phoneNumber, 10);
                validatePassword(password);
                validateIdNumber(idNumber, 8);
                console.log("Validated user input");
        
                const userExist = await User.findOne({
                    $or: [{ idNumber }, { email }, { phoneNumber }]
                });
                console.log("Checked if user exists");
                if (userExist) {
                    throw new ApiError(400, 'User already exists');
                }
        
                const user = new User({
                    name,
                    idNumber,
                    email,
                    password,
                    phoneNumber
                });
        
                // Save user to database first
                await user.save();
                console.log("User saved successfully");
        
                // Generate tokens after saving the user
                const { accessToken, refreshToken } = await generateTokens(user);
                console.log("Generated tokens", accessToken, refreshToken);
        
                // Fetch the saved user without sensitive fields
                const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        
                // Check if loggedInUser is null or undefined
                if (!loggedInUser) {
                    throw new Error("User not found after saving");
                }
        
                const options = { httpOnly: true, secure: true };
                context.res.cookie('refreshToken', refreshToken, options);
                context.res.cookie('accessToken', accessToken, options);
                console.log("User logged in successfully");
        
                return {
                    status: "201",
                    message: 'User created successfully',
                    data: loggedInUser
                };
            } catch (error) {
                console.error("Error adding user:", error);
                throw new Error(error.message);
            }
        },
        
        loginUser: async (parent, { idNumber, password }, context) => {
            try {
                if (!idNumber || !password) {
                    throw new ApiError(400, 'Please fill all fields');
                }

                validateIdNumber(idNumber, 8);
                validatePassword(password);

                const user = await User.findOne({ idNumber });
                if (!user) {
                    throw new ApiError(404, 'User not found');
                }

                const isPasswordCorrect = await user.isPasswordCorrect(password);
                if (!isPasswordCorrect) {
                    throw new ApiError(401, 'Invalid credentials');
                }

                const { accessToken, refreshToken } = await generateTokens(user);
                const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

                const options = { httpOnly: true, secure: true };
                context.res.cookie('refreshToken', refreshToken, options);
                context.res.cookie('accessToken', accessToken, options);

                // return new ApiResponse(200, 'User logged in successfully', { user: loggedInUser });
                return loggedInUser
            } catch (error) {
                console.error("Error logging in user:", error);
                throw new Error("Error logging in user");
            }
        },
        updateUser: async (parent, args) => {
            const { idNumber, name, email, password, phoneNumber, gender, bio } = args.input;
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { idNumber },
                    { $set: { name, email, password, phoneNumber, gender, bio } },
                    { new: true }
                );
                if (!updatedUser) {
                    throw new ApiError(404, 'User not found');
                }
                return updatedUser;
            } catch (error) {
                console.error("Error updating user:", error);
                throw new Error("Error updating user");
            }
        },
        deleteUser: async (parent, { idNumber }) => {
            try {
                const deletedUser = await User.findOneAndDelete({ idNumber });
                if (!deletedUser) {
                    throw new ApiError(404, 'User not found');
                }
                return deletedUser;
            } catch (error) {
                console.error("Error deleting user:", error);
                throw new Error("Error deleting user");
            }
        }
    }
};

export default taResolver;
