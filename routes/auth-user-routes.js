import { Router } from "express";
import { check } from "express-validator";

import authUsersControllers from "../controllers/auth-user-controllers"

const router = Router();

//UPDATE AUTH USER
router.put(
  "/auth-user/update",
  check("email", "E-mail non valide").isEmail(),
  check("password", "Mot de passe invalide")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Doit comporter au moins 5 caractères"),
  check("lastName", "Nom invalide").trim().notEmpty(),
  check("firstName", "Prènom invalide").trim().notEmpty(),
  check("phoneNumber", "Numéro de téléphone invalide")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Numéro de téléphone doit être numérique")
    .isLength({ min: 10, max: 10 })
    .withMessage("Numéro de téléphone doit doit contenir 10 chiffres"),
  check("street", "Rue invalide").trim().notEmpty(),
  check("postalCode", "Code Postal invalide")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Code Postal doit être numérique")
    .isLength({ max: 5 })
    .withMessage("Doit comporter au maximum 5 chiffres"),
  check("city", "La ville invalide").trim().notEmpty(),
  authUsersControllers.updateUser
);



//DELETE AUTH USER FROM DATABASE
router.delete("/auth-user/delete", authUsersControllers.deleteUser);


export default router;