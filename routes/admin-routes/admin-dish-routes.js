import { Router } from "express";

import { body } from "express-validator";

import dishesControllers from "../../controllers/dishes-controllers";
import uploadFileMiddleware from "../../middlewares/file-upload";


const router = Router();

/**
 * @api {post} /products/dish/add Add Dish 
 * @apiName AddDish
 * @apiGroup Admin
 *
 
 * @apiSuccess {String} Post Add a dish by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Le plat a été ajouté"}
 * 
 * @apiError  Unprocessable Entity Dish already exist error HTTP 422 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity 
 *     { message: "Ce plat existe déja" }
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec add Dish. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de l'ajout" }
 */

//ADD DISH
router.post(
  "/products/dish/add",
  uploadFileMiddleware,
  body("name").trim().notEmpty().withMessage("le nom ne doit pas être vide !"),
  body("ingredients").notEmpty(),
  body("nutrients").notEmpty(),
  body("weight", "doit être numérique").trim().notEmpty().isNumeric(),
  body("description").trim().notEmpty(),
  body("price").trim().notEmpty().isNumeric(),
  dishesControllers.addDish
);


/**
 * @api {put} /products/dish/update/:id Update Dish 
 * @apiName UpdateDish
 * @apiGroup Admin
 *
 * @apiSuccess {String} Put Update a dish by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Mise à jour effectuée!"}
 * 
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec upDate Dish. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la mise à jour" }
 */

// UPDATE DISH IN DATABASE
router.put("/products/dish/update/:id", dishesControllers.updateDish);

/**
 * @api {delete} products/dish/delete/:id Delete Dish 
 * @apiName DeleteDish
 * @apiGroup Admin
 *
 * @apiSuccess {String} Delete a dish with his Id by an authenticate Admin.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "Le plat à été effacé"}
 * 
 * 
 *  @apiError  Bad Request Error HTTP 400 Echec Delete Dish. 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la suppression" }
 */

// DELETE DISH IN DATABASE
router.delete("/products/dish/delete/:id", dishesControllers.deleteDish);

export default router;
