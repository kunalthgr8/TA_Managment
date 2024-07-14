// import Jwt from 'jsonwebtoken';

// const authentication = async (req) => {
//   try {
//     const { authorization } = req.headers;
//     console.log("Request:", req);
//     console.log("Headers:", req.headers);
//     console.log("Authorization:", authorization);
//     if (!authorization || !authorization.startsWith("Bearer")) {
//       throw new Error("Unauthorized User");
//     }
//     console.log("Authorization2:", authorization);
//     const authorizationToken = authorization.split(" ")[1];
//     console.log("Authorization Token:", authorizationToken);

//     if (!authorizationToken) {
//       throw new Error("Something Went Wrong");
//     }

//     try {
//       const user = Jwt.verify(authorizationToken, process.env.JWT_SECRET_KEY);
//       console.log("User:", user);
//       return user
//     } catch (error) {
//       throw new Error("Invalid Token");
//     }
//   } catch (error) {
//     console.error("Authentication error:", error);
//     throw error;
//   }
// };

// export default authentication;

import jwt from "jsonwebtoken";
import User from "../models/ta/ta.js";
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
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      console.error("User not found for decoded _id:", decoded._id);
      throw new ApiError(401, "Unauthorized request -> Invalid Token");
    }

    console.log("User during Authentication Middleware:", user);
    req.user = user;
    return user;
  } catch (error) {
    console.error('Error in authentication:', error);
    throw new ApiError(401, "Unauthorized request -> Invalid Token");
  }
};

export default authentication;
