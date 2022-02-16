import { Router } from "express";
import { check } from "express-validator";

import authControllers from "../controllers/auth-controllers";

const router = Router();

/**
 * @api {post} /signup Add User
 * @apiName UserSignup
 * @apiGroup Auth-Users
 *
 * 
 * @apiBody {String} email       Required Email of the User.
 * @apiBody {String} password          Required password.
 * @apiBody {String} lastName     Required Last name of the user
 * @apiBody {String} firstName     Required First name of the user

 * @apiBody {Number} phoneNumber         Required The phone number of the user
 *
 * @apiBody {Object} address         Required nested address object.
 * @apiBody {String} address[street] Required street and number.
 * @apiBody {String} address[postalCode]    Required postalCode.
 * @apiBody {String} address[city]   Required city.
 *
 *
 * @apiSuccess {number} POST the new user Id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "message": "L'utilisateur a été bien ajouté!"
}
 *
 * @apiError  Unprocessable Entity User already exist erroc HTTP 422 .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     { message: "L'utilisateur existe déjà" }
 * 
 * @apiError Bad Request Error HTTP 400 Echec add User.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request	
 *     { message: "Échec de l'ajout d'un utilisateur dans la base de données" }
 */



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
    .isLength({ min: 5, max: 5 })
    .withMessage("Doit comporter au maximum 5 chiffres"),
  check("city", "La ville invalide").trim().notEmpty(),
  authControllers.signUp
);

/**
 * @api {get} /auth Request Authorization ApiKey
 * @apiName GetJWTToken via APIkEY
 * @apiGroup Auth-Users
 *
 *@apiHeader {String} authorization x-api-key <API_KEY>.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
 * @apiSuccess {String} firstname lastname email rolefirstname lastname email role.
 *
 * 
 * 
 * @apiError Bad Request Error HTTP 400 .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 	
 *     { message: "La demande n'est pas valide." }
 */

// GET TOKEN WITH API KEY
router.get("/auth", authControllers.auth);

/**
 * @api {post} /login Login user
 * @apiName LoginUser
 * @apiGroup Auth-Users
 *
 
 * @apiSuccess {String} Get Get the userID,the email ,the role and the Token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
   {
      "userId": "61fbb74e14ac8b883c7d698c",
      "email": "hibaaaa@test.com",
      "role": "USER",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWZiYjc0ZTE0YWM4Yjg4M2M3ZDY5OGMiLCJlbWFpbCI6ImhpYmFhYWFAdGVzdC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0Mzk4MTU4MiwiZXhwTgyfQ.mZBjTsgleVJq3QOv4ec4yEPN"
    }
 ]
 * 
 * @apiError Not Found Erreur 404 du client HTTP  .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "Une erreur s'est produite lors de la recherche de l'utilisateur" }
 */


// LOGIN AND GET TOKEN
router.post("/login", authControllers.login);

export default router;
