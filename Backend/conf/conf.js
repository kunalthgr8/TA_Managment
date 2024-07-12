const conf = {
  mongodbUri: String(process.env.MONGODB_URI),
  accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
  refreshTokenSecret: String(process.env.REFRESH_TOKEN_SECRET),
  accessTokenExpiry: String(process.env.ACCESS_TOKEN_EXPIRY),
  refreshTokenExpiry: String(process.env.REFRESH_TOKEN_EXPIRY),
  port: Number(process.env.PORT),
};
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf;
