import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import uuidAPIKey from "uuid-apikey";

import User from "../models/user.model";
import HttpError from "../models/http-error";

dotenv.config();

// ADD USER (SIGN UP)
const signUp = async (req, res, next) => {
  // IF SOME VALUES NOT VALID
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.lastName,
    req.body.firstName,
    req.body.phoneNumber,
    req.body.street,
    req.body.postalCode,
    req.body.city,
    uuidAPIKey.create().apiKey
  );

  try {
    const userExist = await user.userExistAlready();
    if (userExist) {
      return res.status(422).json({ message: "L'utilisateur existe déjà" });
    }

    await user.addUserInDB();
  } catch (error) {
    return next(
      new HttpError(
        "Échec de l'ajout d'un utilisateur dans la base de données",
        400
      )
    );
  }

  return res.status(201).json({
    message: "L'utilisateur a été bien ajouté!",
  });
};

// AUTHENTICATION WITH API KEY
const auth = async (req, res, next) => {
  if (
    typeof req.headers["x-api-key"] == "undefined" ||
    uuidAPIKey.isAPIKey(req.headers["x-api-key"]) !== true
  ) {
    return res.status(400).json({ message: `La demande n'est pas valide.` });
  }

  // If API key is valid we generate TOKEN
  let user;
  try {
     user = await User.findByApiKey(req.headers["x-api-key"]);
    if (!user) return next(new HttpError("L'utilisatue n'a pas été trouvé", 400));
  } catch (error) {
    return next(new HttpError("La demande n'est pas valide.", 400));
  }


   // GENERATE TOKEN
   let token;
   try {
     token = jwt.sign(
       {
         userId: user.id,
         email: user.email,
         role: user.role,
       },
       process.env.JWT_SECRET_KEY,
       { expiresIn: "1h" }
     );
   } catch (error) {
     return next(new HttpError("La génération du token a échoué", 400));
   }
 
   res.json({
     userId: user.id,
     email: user.email,
     role: user.role,
     token: token,
   });


};

// LOGIN
const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(
      new HttpError(
        "Une erreur s'est produite lors de la recherche de l'utilisateur",
        404
      )
    );
  }

  if (!existingUser) {
    return res
      .status(401)
      .json({ message: "L'utilisateur avec cet email n'existe pas" });
  }

  const passwordIsGood = await user.comparePassword(existingUser.password);

  if (!passwordIsGood) {
    // return res.status(401).json({ message: "Mot de passe incorrect" });
    return next(new HttpError("Mot de passe incorrect", 401));
  }

  // GENERATE TOKEN
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("La génération du token a échoué", 400));
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
    token: token,
  });
};

export default {
  login,
  auth,
  signUp,
};
