import { Router } from "express";

import { body } from "express-validator";

import dishesControllers from "../../controllers/dishes-controllers";

const router = Router();

//ADD DISH
router.post(
  "/products/dish/add",
  body("name").trim().notEmpty().withMessage("le nom ne doit pas être vide !"),
  //body("ingredients").notEmpty(),
  //body("nutrients").notEmpty(),
  body("image").trim().notEmpty(),
  body("weight", "doit être numérique").trim().notEmpty().isNumeric(),
  body("description").trim().notEmpty(),
  body("price").trim().notEmpty().isNumeric(),
  dishesControllers.addDish
);

// UPDATE DISH IN DATABASE
router.put("/products/dish/update/:id", dishesControllers.updateDish);

// DELETE DISH IN DATABASE
router.delete("/products/dish/delete/:id", dishesControllers.deleteDish);

export default router;
