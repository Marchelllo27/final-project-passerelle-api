import { validationResult } from "express-validator";

import User from "../models/user.model";
import HttpError from "../models/http-error";

//GET USER BY ID
const getProfile = async (req, res, next) => {
  if (req.userData) {
    try {
      const user = await User.findUserById(req.userData.userId);
      res.json(user);
    } catch (error) {
      return next(
        new HttpError(
          "Malheureusement, nous ne pouvons pas trouver l'utilisateur",
          404
        )
      );
    }
  } else {
    return next(
      new HttpError(
        "Malheureusement, quelque chose s'est mal passé sur le server",
        500
      )
    );
  }
};

// UPDATE USER
const updateUser = async (req, res, next) => {
  // IF SOME VALUES NOT VALID
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  if (req.userData) {
    try {
      await User.findUserById(req.userData.userId);
    } catch (error) {
      return next(
        new HttpError(
          "Malheureusement, nous ne pouvons pas trouver l'utilisateur",
          404
        )
      );
    }
  } else {
    return next(
      new HttpError(
        "Malheureusement, quelque chose s'est mal passé sur le server",
        500
      )
    );
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.lastName,
    req.body.firstName,
    req.body.phoneNumber,
    req.body.street,
    req.body.postalCode,
    req.body.city
  );

  try {
    await user.updateUserData(req.userData.userId);
    return res.json({ message: "Données utilisateur modifiées" });
  } catch (error) {
    return next(new HttpError("Échec pendant modification des données", 400));
  }
};

// DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    const userExist = await User.findUserById(req.userData.userId);

    if (!userExist)
      return next(new HttpError("L'utilisateur n'existe pas", 400));

    await User.deleteUser(req.userData.userId);
    return res.json({ message: "L'utilisateur a été bien supprimé" });
  } catch (error) {
    return next(
      new HttpError("Échec, l'utilisateur n'a pas été supprimé", 400)
    );
  }
};

export default {
  getProfile,
  updateUser,
  deleteUser,
};
