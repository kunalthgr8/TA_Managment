import Faculty from '../../models/faculty/faculty.js';
import {ApiError} from '../../utils/ApiError.js';
// import {ApiResponse} from '../../utils/ApiResponse.js';
import { AuthenticationError } from "apollo-server";
import {
  validateAlphabet,
  validateEmail,
  validateIdNumber,
  validateNumber,
  validatePassword,
} from "../../db/validation.js";

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

const facultyResolvers = {
  Query: {
    getFaculty: async (_, { idNumber }, context) => {
      authenticate(context);
      try {
        const faculty = await Faculty.findOne(idNumber);
        if (!faculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return faculty;
      } catch (error) {
        console.error("Error fetching faculty:", error);
        throw new Error(error.message || "Error fetching faculty");
      }
    }
  },
  Mutation: {
    generateAccessAndRefreshToken: async (parent, { idNumber }) => {
      const user = await Faculty.findOne({ idNumber });
      return generateTokens(user);
    },

    registerFaculty: async (
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

        const userExist = await Faculty.findOne({
          $or: [{ idNumber }, { email }, { phoneNumber }],
        });
        if (userExist) {
          throw new ApiError(400, "User already exists");
        }

        const user = new Faculty({
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
        const loggedInUser = await Faculty.findById(user._id).select(
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

    updateFaculty: async (_, { id, name, email, phoneNumber }) => {
      try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
          id,
          { name, email, phoneNumber },
          { new: true }
        );
        if (!updatedFaculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return new ApiResponse(200, updatedFaculty, "Faculty updated successfully");
      } catch (error) {
        console.error("Error updating faculty:", error);
        throw new ApiError(500, "Error updating faculty", [], error.stack);
      }
    },
    deleteFaculty: async (_, { id }) => {
      try {
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return new ApiResponse(200, deletedFaculty, "Faculty deleted successfully");
      } catch (error) {
        console.error("Error deleting faculty:", error);
        throw new ApiError(500, "Error deleting faculty", [], error.stack);
      }
    }
  }
};

export default facultyResolvers;
