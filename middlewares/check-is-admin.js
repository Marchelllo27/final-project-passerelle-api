import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "../models/http-error";

dotenv.config();

const checkIsAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1] || null;

    if (!token) {
      throw new Error("Pas autorisé!");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const role = decodedToken.role;

    if (role !== "ADMIN") {
      throw new Error("Pas autorisé!")
    }
    next();
  } catch (error) {
    return next(new HttpError("Pas autorisé!", 401));
  }
};

export default checkIsAdmin;
