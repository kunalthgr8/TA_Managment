import User from "../../models/ta/ta.js";
import { AuthenticationError } from "apollo-server";
import {
  validateAlphabet,
  validateEmail,
  validateIdNumber,
  validateNumber,
  validatePassword,
} from "../../db/validation.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Talist from "../../models/ta/talist.js";

const generateTokens = async (user) => {
  if (!user) {
    throw new AuthenticationError("User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken, user };
};

const authenticate = (context) => {
  if (!context.user) {
    throw new Error("Unauthorized");
  }
};

const taResolver = {
  Query: {
    getAllUsers: async (_, {courseId}, context) => {
      authenticate(context);

      try {
        const response = await Talist.findOne({ courseId });
        console.log("TA list by course ID",response)
        if (!response) {
          return {
            status: 404,
            message: "TAs not found",
            data: [],
          }
        }
        const talist = response.talist
        const tadetails = await User.find({idNumber: {$in: talist}})
        console.log("TAs details",tadetails)
        let TAs = [];
        tadetails.forEach((ta) => {
          TAs.push({
            idNumber: ta.idNumber,
            name: ta.name,
            email: ta.email,
            phoneNumber: ta.phoneNumber,
            approved: ta.approved.some(id => id === courseId) ? true : false,
          });
        });
        console.log("TAs",TAs )
        return {
          status: 201,
          message: "TAs fetched Successfull",
          data: TAs,
        };
        // const data = tadetails.map((ta) => {
        //   idNumber: ta.idNumber,
        //   name: ta.name,
          // "idNumber": ta.idNumber,
          // "name": ta.name,
          // email: ta.email,
          // phoneNumber: ta.phoneNumber,
          // approved: ta.approved});
          
        // return await User.find();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
      }
    },
    getUser: async (parent, { idNumber }, context) => {
      authenticate(context);
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
    },
  },
  Mutation: {
    generateAccessAndRefreshToken: async (parent, { idNumber }) => {
      const user = await User.findOne({ idNumber });
      return generateTokens(user);
    },
    registerUser: async (
      parent,
      { input: { name, idNumber, email, password, phoneNumber } },
      context
    ) => {
      try {
        if (!name || !idNumber || !email || !password || !phoneNumber) {
          throw new ApiError(400, "Please fill all fields");
        }

        validateAlphabet(name);
        validateEmail(email);
        validateNumber(phoneNumber, 10);
        validatePassword(password);
        validateIdNumber(idNumber, 8);

        const userExist = await User.findOne({
          $or: [{ idNumber }, { email }, { phoneNumber }],
        });
        if (userExist) {
          throw new ApiError(400, "User already exists");
        }

        const user = new User({
          name,
          idNumber,
          email,
          password,
          phoneNumber,
        });

        // Save user to database first
        await user.save();

        // Generate tokens after saving the user
        const { accessToken, refreshToken } = await generateTokens(user);

        // Fetch the saved user without sensitive fields
        const loggedInUser = await User.findById(user._id).select(
          "-password -refreshToken"
        );

        // Check if loggedInUser is null or undefined
        if (!loggedInUser) {
          throw new Error("User not found after saving");
        }

        const options = { httpOnly: true, secure: true };
        context.res.cookie("refreshToken", refreshToken, options);
        context.res.cookie("accessToken", accessToken, options);

        return {
          status: "201",
          message: "User created successfully",
          data: { ...loggedInUser["_doc"], accessToken: accessToken },
        };
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error(error.message);
      }
    },

    loginUser: async (parent, { input: { idNumber, password } }, context) => {
      try {
        if (!idNumber || !password) {
          throw new ApiError(400, "Please fill all fields");
        }

        validateIdNumber(idNumber, 8);
        validatePassword(password);

        const user = await User.findOne({ idNumber });
        if (!user) {
          throw new ApiError(404, "User not found");
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
          throw new ApiError(401, "Invalid credentials");
        }

        const { accessToken, refreshToken } = await generateTokens(user);
        const loggedInUser = await User.findById(user._id).select(
          "-password -refreshToken"
        );

        const options = { httpOnly: true, secure: true };
        context.res.cookie("refreshToken", refreshToken, options);
        context.res.cookie("accessToken", accessToken, options);

        // return new ApiResponse(200, 'User logged in successfully', { user: loggedInUser });
        const update = { ...loggedInUser, accessToken: accessToken };
        return {
          status: 201,
          message: "User logged in successfully",
          data: { ...loggedInUser["_doc"], accessToken: accessToken },
        };
      } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error(error.message);
      }
    },
    updateUser: async (parent, { input }, context) => {
      authenticate(context);
      const { idNumber, ...updateFields } = input;
      if (context.user.idNumber !== idNumber) {
        throw new ApiError(404, "Unauthorized");
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { idNumber },
          { $set: updateFields },
          { new: true }
        );
        if (!updatedUser) {
          throw new ApiError(404, "User not found");
        }
        return {
          status: 201,
          message: "User logged in successfully",
          data: updatedUser,
        };
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Error updating user");
      }
    },
    deleteUser: async (parent, { idNumber }, context) => {
      authenticate(context);
      try {
        const deletedUser = await User.findOneAndDelete({
          idNumber: context.user.idNumber,
        });
        if (!deletedUser) {
          throw new ApiError(404, "User not found");
        }
        return deletedUser;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Error deleting user");
      }
    },
    logoutUser: async (parent, { idNumber }, context) => {
      authenticate(context);
      try {
        const user = await User.findOne({ idNumber: context.user.idNumber });
        if (!user) {
          throw new ApiError(404, "User not found");
        }

        user.refreshToken = null;
        await user.save({ validateBeforeSave: false });

        context.res.clearCookie("refreshToken");
        context.res.clearCookie("accessToken");

        return {
          status: 200,
          message: "User logged out successfully",
        };
      } catch (error) {
        console.error("Error logging out user:", error);
        throw new Error(error.message);
      }
    },
    changePassword: async (
      parent,
      { input: { idNumber, oldPassword, newPassword } },
      context
    ) => {
      authenticate(context);
      try {
        if (!idNumber || !oldPassword || !newPassword) {
          throw new ApiError(400, "Please provide all fields");
        }
        if (context.user.idNumber !== idNumber) {
          throw new ApiError(400, "Unauthorized");
        }

        validateIdNumber(idNumber, 8);
        validatePassword(newPassword);

        const user = await User.findOne({ idNumber });
        if (!user) {
          throw new ApiError(404, "User not found");
        }

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordCorrect) {
          throw new ApiError(401, "Invalid credentials");
        }

        user.password = newPassword;
        await user.save();

        return {
          status: 200,
          message: "Password changed successfully",
        };
      } catch (error) {
        console.error("Error changing password:", error);
        throw new Error(error.message);
      }
    },
  },
};

export default taResolver;
