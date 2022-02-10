import { Router } from "express";
import { check } from "express-validator";

import authUsersControllers from "../controllers/auth-user-controllers"

const router = Router();

/**
 * @api {put} /auth-user/update UpDate User
 * @apiName UpDateUser
 * @apiGroup Auth-Users
 *
 
 * @apiSuccess {String} Return the user information with the update.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
   {
      "message": "Données utilisateur modifiées"
    }
 ]
 * 
 * @apiError Not Found Erreur HTTP 404  .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "Échec pendant modification des données" }
 */

//UPDATE AUTH USER
router.put(
  "/update",
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



/**
 * @api {delete} /auth-user/delete Delete User
 * @apiName DeleteUser
 * @apiGroup Auth-Users
 *
 
 * @apiSuccess {String} Delete Delete the user for the data base.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
   {
      "message": "L'utilisateur a été bien supprimé"
    }
 ]
 * 
 * @apiError Not Found Erreur HTTP 404   
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "Échec, l'utilisateur n'a pas été supprimé" }
 */


//DELETE AUTH USER FROM DATABASE
router.delete("/delete", authUsersControllers.deleteUser);


export default router;