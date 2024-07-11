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
        userRegistration: async (parent, args) => {
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
                return new ApiResponse(201,'User created successfully',{
                    idNumber:user.idNumber,
                    name:user.name,
                    email:user.email,
                    phoneNumber:user.phoneNumber
                });
            } catch (error) {
                console.error("Error adding user:", error);
                throw new Error("Error adding user");
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
        refreshToken: async (_, { refreshToken }) => {
            try {
              const decoded = Jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
              const user = await User.findById(decoded.userId);
              if (!user) {
                throw new AuthenticationError('User not found');
              }
              const newToken = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
              const newRefreshToken = Jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
              return {
                token: newToken,
                refreshToken: newRefreshToken,
                user
              };
            } catch (error) {
              throw new AuthenticationError('Invalid or expired refresh token');
            }
          }
    }
};

export default taResolver;
