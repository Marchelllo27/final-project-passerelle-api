import { Router } from "express";
import { check } from "express-validator";

import authControllers from "../controllers/auth-controllers";

const router = Router();

//SIGN UP (ADD USER IN DATABASE)
router.post(
  "/signup",
  check("email", "E-mail non valide").isEmail(),
  check("password", "Mot de passe invalide")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Doit comporter au moins 5 caractères"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(
        "La confirmation du mot de passe ne correspond pas au mot de passe"
      );
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
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
  authControllers.signUp
);


// GET TOKEN WITH API KEY
router.get("/auth", authControllers.auth);

// LOGIN AND GET TOKEN
router.post("/login", authControllers.login);

export default router;
