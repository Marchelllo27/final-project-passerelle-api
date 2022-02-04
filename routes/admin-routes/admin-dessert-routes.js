import { Router } from "express";
import { body } from "express-validator";

import dessertsControllers from "../../controllers/desserts-controllers";

const router = Router();



/**
 * @api {post} products/dessert/add Add Dessert 
 * @apiName AddDessert
 * @apiGroup Admin
 *
 
 * @apiSuccess {String} Post Add a dessert by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Le dessert a été ajouté"}
 * 
 * @apiError  Unprocessable Entity Dessert already exist error HTTP 422 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity 
 *     { message: "Ce dessert existe déja" }
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec add Dessert. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de l'ajout" }
 */

//ADD DESSERT
router.post(
  "/products/dessert/add",
  body("name").trim().notEmpty().withMessage("le nom ne doit pas être vide !"),
  //body("ingredients").notEmpty(),
  //body("nutrients").notEmpty(),
  body("image").trim().notEmpty(),
  body("weight", "doit être numérique").trim().notEmpty().isNumeric(),
  body("description").trim().notEmpty(),
  body("price").trim().notEmpty().isNumeric(),
  dessertsControllers.addDessert
);

/**
 * @api {put} /products/dessert/update/:id Update Dessert 
 * @apiName UpdateDessert
 * @apiGroup Admin
 *
 * @apiSuccess {String} Put Update a dessert by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Mise à jour effectuée!"}
 * 
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec upDate Dessert. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la mise à jour" }
 */

// UPDATE DESSERT IN DATABASE
router.put("/products/dessert/update/:id", dessertsControllers.updateDessert);

/**
 * @api {delete} /products/dessert/delete/:id Delete Dessert 
 * @apiName DeleteDessert
 * @apiGroup Admin
 *
 * @apiSuccess {String} Delete a dessert with his Id by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Le dessert à été éffacé"}
 * 
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec Delete Dessert. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la suppression" }
 */

// DELETE DESSERT IN DATABASE
router.delete(
  "/products/dessert/delete/:id",
  dessertsControllers.deleteDessert
);

export default router;
