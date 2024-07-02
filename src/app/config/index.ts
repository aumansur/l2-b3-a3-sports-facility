import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_SECRET,
};
