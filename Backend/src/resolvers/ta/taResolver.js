import User from '../../models/ta/ta.js';
import Jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { validateAlphabet, validateAlphabetWithOneSpace, validateEmail, validateidNumber, validateNumber, validatePassword } from '../../db/validation.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
// import dotenv from 'dotenv';
// dotenv.config();


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
                const users = await User.find({ idNumber });
                if (users.length === 0) {
                    throw new Error("No users found with this ID number");
                }
                return users;
            } catch (error) {
                console.error("Error fetching users by ID number:", error);
                throw new Error(error.message || "Error fetching users by ID number");
            }
        }
    },
    Mutation: {
        generateAccessAndRefreshToken: async (user) => {
            try {
                if (!user) {
                    throw new AuthenticationError('User not found');
                }
                const accessToken = user.generateAccessToken();
                const refreshToken = user.generateRefreshToken();
                user.refreshToken = refreshToken;
                await user.save({ validateBeforeSave: false });
                return { accessToken, refreshToken, user };
            } catch (error) {
                throw new AuthenticationError('Invalid or expired refresh token');
            }
        },
        userRegistration: async (parent, args,{res}) => {
            try {
                const {name,idNumber,email,password,phoneNumber} = args;
                
                if (!name || !idNumber || !email || !password || !phoneNumber) {
                    throw new ApiError(400,'Please fill all fields');
                }

                validateAlphabet(name);
                validateEmail(email);
                validateNumber(phoneNumber, 10);
                validatePassword(password);
                validateidNumber(idNumber, 8);

                //check if user is already exist or not
                const userExist = await User.findOne({ 
                    $or: [{ idNumber: idNumber }, { email: email }, { phoneNumber: phoneNumber }] 
                });

                if (userExist) {
                    throw new ApiError(400,'User already exist');
                }

                const user = await User.create({
                    name,
                    idNumber,
                    email,
                    password,
                    phoneNumber
                });
                if (!user) {
                    throw new ApiError(500,'User not created');
                }
                const { accessToken, refreshToken } = await taResolver.Mutation.generateAccessAndRefreshToken(user);

                const loggedInUser = await User.findById(user._id).select(
                    "-password -refreshToken"
                  );

                const option = {
                    httpOnly: true,
                    secure: true,
                };
                //Set Cookies
                res.cookie('refreshToken',refreshToken,option);
                res.cookie('accessToken',accessToken,option);
                return new ApiResponse(201,'User created successfully',{
                    user: loggedInUser
                });
            } catch (error) {
                console.error("Error adding user:", error);
                throw new Error("Error adding user");
            }
        },

        userLogin: async (parent, args,{res}) => {
            try{
                const {idNumber,password} = args;
                if (!idNumber || !password) {
                    throw new ApiError(400,'Please fill all fields');
                }
                validateidNumber(idNumber, 8);
                validatePassword(password);

                const existingUser = await User.findOne({ idNumber});

                if (!existingUser){
                    throw new ApiError(404,'User not found');
                }

                const isPasswordCorrect = await existingUser.isPasswordCorrect(password);

                if (!isPasswordCorrect) {
                    throw new ApiError(401,'Invalid credentials');
                }

                const { accessToken, refreshToken } = await taResolver.Mutation.generateAccessAndRefreshToken(existingUser);

                const loggedInUser = await User.findById(existingUser._id).select(
                    "-password -refreshToken"
                  );

                
                const option = {
                    httpOnly: true,
                    secure: true,
                };
                //Set Cookies
                res.cookie('refreshToken',refreshToken,option);
                res.cookie('accessToken',accessToken,option);
            
                return new ApiResponse(200,'User logged in successfully',{
                    user: loggedInUser
                });

            }catch(error){
                console.log("Error logging in user:", error);
                throw new Error("Error logging in user");
            }
        },

        updateUser: async (_, { idNumber, name, email, password, phoneNumber, gender, bio }) => {
            const updatedUser = await User.findOneAndUpdate(
              { idNumber: idNumber },
              { $set: { name, email, password, phoneNumber, gender, bio } },
              { new: true }
            );
            if (!updatedUser) {
              throw new Error('User not found');
            }
            return updatedUser;
          },

        deleteUser: async (_, { idNumber }) => {
            const deletedUser = await User.findOneAndDelete({ idNumber: idNumber });
            if (!deletedUser) {
                throw new Error('User not found');
            }
            return deletedUser;
        },
        
    }
};

export default taResolver;
