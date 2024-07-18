import Faculty from "../../models/faculty/faculty.js";
import { ApiError } from "../../utils/ApiError.js";
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
    throw new ApiError(401, "Unauthorized");
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
    },
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
          throw new ApiError(500, "Error creating user");
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
        throw new ApiError(500, "Error creating user", [], error.stack);
      }
    },

    loginFaculty: async (
      parent,
      { input: { idNumber, password } },
      context
    ) => {
      try {
        if (!idNumber || !password) {
          throw new ApiError(400, "Please fill all fields");
        }

        validateIdNumber(idNumber, 8);
        validatePassword(password);

        const user = await Faculty.findOne({ idNumber });
        if (!user) {
          throw new ApiError(404, "User not found");
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
          throw new ApiError(401, "Invalid credentials");
        }

        const { accessToken, refreshToken } = await generateTokens(user);
        const loggedInUser = await Faculty.findById(user._id).select(
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
        throw new ApiError(500, "Error logging in user", [], error.stack);
      }
    },

    updateFaculty: async (_, { id, name, email, phoneNumber }) => {
      console.log("updateFaculty");
      console.log(id, name, email, phoneNumber);
      authenticate(context);
      if (id !== context.user.idNumber) {
        throw new ApiError(404, "Authneticated");
      }
      try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
          id,
          { name, email, phoneNumber },
          { new: true }
        );
        if (!updatedFaculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return new ApiResponse(
          200,
          updatedFaculty,
          "Faculty updated successfully"
        );
      } catch (error) {
        throw new ApiError(500, "Error updating faculty", [], error.stack);
      }
    },
    deleteFaculty: async (_, { id }) => {
      authenticate(context);
      if (id !== context.user.idNumber) {
        throw new ApiError(404, "Authneticated");
      }
      try {
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
          throw new ApiError(404, "Faculty not found");
        }
        return new ApiResponse(
          200,
          deletedFaculty,
          "Faculty deleted successfully"
        );
      } catch (error) {
        console.error("Error deleting faculty:", error);
        throw new ApiError(500, "Error deleting faculty", [], error.stack);
      }
    },
    logoutFaculty: async (parent, { idNumber }, context) => {
      authenticate(context);
      if (idNumber !== context.user.idNumber) {
        throw new ApiError(404, "Authneticated");
      }
      try {
        const user = await Faculty.findOne({ idNumber: context.user.idNumber });
        if (!user) {
          throw new ApiError(404, "User not found");
        }

        user.refreshToken = null;
        await user.save({ validateBeforeSave: false });

        context.res.clearCookie("refreshToken");
        context.res.clearCookie("accessToken");

        return {
          status: 200,
          message: "Faculty logged out successfully",
        };
      } catch (error) {
        console.error("Error logging out user:", error);
        throw new Error(error.message);
      }
    },
    changePasswordFaculty: async (
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

        const user = await Faculty.findOne({ idNumber });
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
        throw new ApiError(500, "Error changing password", [], error.stack);
      }
    },
  },
};

export default facultyResolvers;
