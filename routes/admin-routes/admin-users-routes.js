import { Router } from "express";
import { check} from "express-validator";

import adminUsersContollers from "../../controllers/admin-users-controllers"

const router = Router();

/**
 * @api {get} /users Get Users
 * @apiName GetUsers
 * @apiGroup Admin
 *
 
 * @apiSuccess {String} Get Get all the users by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
    {
        "_id": "61f92e898d40710d1266d86f",
        "email": "admin@admin.com",
        "role": "ADMIN",
        "lastName": "Admin",
        "firstName": "Admin",
        "phoneNumber": "0783881567",
        "address": {
            "street": "ADMIN",
            "postalCode": "92550",
            "city": "ADMIN"
        },
        "created_at": "2022-02-01T12:58:49.208Z",
        "edited_at": "2022-02-01T12:58:49.208Z"
    },
    {
        "_id": "61fb8ff51fe2b407d0dd1c51",
        "email": "hiba@test.com",
        "role": "USER",
        "lastName": "John",
        "firstName": "test",
        "phoneNumber": "0783881567",
        "address": {
            "street": "22 rue de la bastille",
            "postalCode": "92550",
            "city": "Test-City"
        },
        "created_at": "2022-02-03T08:19:01.734Z",
        "edited_at": "2022-02-03T08:19:01.734Z"
    },
]
 * 
 * @apiError Not Found Erreur HTTP 404   
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "Aucun utilisateur trouvé" }
 * 
 */

//FIND ALL USERS
router.get("/users", adminUsersContollers.findAllUsers);

/**
 * @api {get} /user/:id Get User 
 * @apiName GetUser
 * @apiGroup Admin
 *
 
 * @apiSuccess {String} Get Get one user for an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
   {
        "_id": "61fb8ff51fe2b407d0dd1c51",
        "email": "hiba@test.com",
        "role": "USER",
        "lastName": "John",
        "firstName": "test",
        "phoneNumber": "0783881567",
        "address": {
            "street": "22 rue de la bastille",
            "postalCode": "92550",
            "city": "Test-City"
        },
        "created_at": "2022-02-03T08:19:01.734Z",
        "edited_at": "2022-02-03T08:19:01.734Z"
    }
  
       
]
 * 
 * @apiError Not Found Erreur HTTP 404   
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "L'utilisateur n'existe pas" }
 */

//FIND USER BY ID
router.get("/user/:id", adminUsersContollers.findUserById);

/**
 * @api {put} /user/update/:id Update User 
 * @apiName UpDateUser
 * @apiGroup Admin
 *
 
 * @apiSuccess {String} Put Update a user with his id by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Données utilisateur modifiées" }
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Échec pendant modification des données" }
 * 
 *  @apiError Not Found Erreur HTTP 404 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "L'utilisateur n'existe pas" }
 */

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

/**
 * @api {delete} /user/delete/:id Delete User 
 * @apiName DeleteUser
 * @apiGroup Admin
 *
 
 * @apiSuccess {String} Delete Delete a user with his id by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "L'utilisateur a été bien supprimé"}
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Échec, l'utilisateur n'a pas été supprimé" }
 */

//DELETE USER IN DATABASE
router.delete("/user/delete/:id", adminUsersContollers.deleteUser);

export default router;
