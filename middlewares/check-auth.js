import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "../models/http-error";

dotenv.config();

 


const checkAuth = (req, res, next) => {
  // browser behavior, he sends options request before he sends actual POST for example request
  // for avoid error we can use this piece of code
  // if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization.split(" ")[1] || null;

    if (!token) {
      throw new Error("Authentification échouée!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, dataJwt) => {
      if(err) return next(new HttpError("Authentification échouée!", 401));

      req.userData = dataJwt;
      next();
    });
  } catch (error) {
    return next(new HttpError("Authentification échouée!", 401));
  }
};

export default checkAuth;
