import { validationResult } from "express-validator";

import User from "../models/user.model";
import HttpError from "../models/http-error";

// FIND ALL USERS
const findAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }

    res.json(users);
  } catch (error) {
    return next(new HttpError("Aucun utilisateur trouvé", 404));
  }
};

// FIND BY ID

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    res.json(user);
  } catch (error) {
    return next(new HttpError("L'utilisateur n'existe pas", 404));
  }
};

// UPDATE USER
const updateUser = async (req, res, next) => {
  // IF SOME VALUES NOT VALID
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const userExist = await User.findUserById(req.params.id);
    if (!userExist) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
  } catch (error) {
    return next(new HttpError("L'utilisateur n'existe pas", 404));
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
    await user.updateUserData(req.params.id);
    return res.json({ message: "Données utilisateur modifiées" });
  } catch (error) {
    return next(new HttpError("Échec pendant modification des données", 400));
  }
};

// DELETE USER

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteUser(req.params.id);
    return res.json({ message: "L'utilisateur a été bien supprimé" });
  } catch (error) {
    return next(
      new HttpError("Échec, l'utilisateur n'a pas été supprimé", 400)
    );
  }
};

export default {
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};
