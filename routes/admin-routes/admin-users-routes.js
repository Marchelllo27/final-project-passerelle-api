import { Router } from "express";
import { check} from "express-validator";

import adminUsersContollers from "../../controllers/admin-users-controllers"

const router = Router();


//FIND ALL USERS
router.get("/users", adminUsersContollers.findAllUsers);

//FIND USER BY ID
router.get("/user/:id", adminUsersContollers.findUserById);

//UPDATE USER IN DATABASE
router.put(
  "/user/update/:id",
  check("email", "e-mail non valide").isEmail(),
  check("password", "Mot de passe invalide")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("doit comporter au moins 5 caractères"),
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
    .withMessage("doit comporter au maximum 5 chiffres"),
  check("city", "La ville invalide").trim().notEmpty(),
  adminUsersContollers.updateUser
);

//DELETE USER IN DATABASE
router.delete("/user/delete/:id", adminUsersContollers.deleteUser);

export default router;
