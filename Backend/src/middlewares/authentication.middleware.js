import jwt from "jsonwebtoken";
import TA from "../models/ta/ta.js";
import Faculty from "../models/faculty/faculty.js";
import { ApiError } from "../utils/ApiError.js";

const authentication = async (req) => {
  const cookieToken = req.cookies?.accessToken;
  const authHeader = req.headers.authorization;
  let token = null;

  // Prefer header token over cookie token
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    console.error("No token found in headers or cookies");
    throw new ApiError(401, "Unauthorized request -> No Token found");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = null;

    if (decoded.userType === "TA") {
      user = await TA.findById(decoded?._id).select("-password -refreshToken");
    } else if (decoded.userType === "Faculty") {
      user = await Faculty.findById(decoded?._id).select(
        "-password -refreshToken"
      );
    }

    if (!user) {
      console.error("User not found for decoded _id:", decoded._id);
      throw new ApiError(401, "Unauthorized request -> Invalid Token");
    }
    req.user = user;
    return user;
  } catch (error) {
    console.error("Error in authentication:", error);
    throw new ApiError(401, "Unauthorized request -> Invalid Token");
  }
};

export default authentication;
