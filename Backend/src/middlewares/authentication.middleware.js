import Jwt from 'jsonwebtoken';

const authentication = async (context) => {
  try {
    const { authorization } = context.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      throw new Error("Unauthorized User");
    }

    const authorizationToken = authorization.split(" ")[1];

    if (!authorizationToken) {
      throw new Error("Something Went Wrong");
    }

    try {
      return Jwt.verify(authorizationToken, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new Error("Invalid Token");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

export default authentication;
