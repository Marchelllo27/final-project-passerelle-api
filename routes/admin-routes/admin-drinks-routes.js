import { Router } from "express";
import { body } from "express-validator";

import drinksControllers from "../../controllers/drinks-controllers";

const router = Router();

/**
 * @api {post} products/drink/add Add Drink
 * @apiName AddDrink
 * @apiGroup Admin
 *
 
 * @apiSuccess {String} Post Add a drink by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La boisson a été ajoutée"}
 * 
 * @apiError  Unprocessable Entity Drink already exist error HTTP 422 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity 
 *     { message: "Cette boisson existe déja" }
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec add Drink. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de l'ajout" }
 */

//ADD DRINK
router.post(
  "/products/drink/add",
  body("name").trim().notEmpty().withMessage("le nom ne doit pas être vide !"),
  //body("ingredients").notEmpty(),
  //body("nutrients").notEmpty(),
  body("image").trim().notEmpty(),
  body("weight", "doit être numérique")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Le poid doit étre un chiffre"),
  body("description").trim().notEmpty(),
  body("price")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Le prix doit être un chiffre"),
  drinksControllers.addDrink
);


/**
 * @api {put} /products/drink/update/:id Update Drink 
 * @apiName UpdateDrink
 * @apiGroup Admin
 *
 * @apiSuccess {String} Put Update a drink by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Mise à jour effectuée!"}
 * 
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec upDate Drink. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la mise à jour" }
 */

// UPDATE DRINK IN DATABASE
router.put("/products/drink/update/:id", drinksControllers.updateDrink);


/**
 * @api {delete} /products/drink/delete/:id Delete Drink 
 * @apiGroup Admin
 *
 * @apiSuccess {String} Delete a drink with his Id by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La boisson à été effacée"}
 * 
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec Delete drink. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la suppression" }
 */

// DELETE DRINK IN DATABASE
router.delete("/products/drink/delete/:id", drinksControllers.deleteDrink);

export default router;
