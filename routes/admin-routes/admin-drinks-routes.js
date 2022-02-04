import { Router } from "express";
import { body } from "express-validator";

import drinksControllers from "../../controllers/drinks-controllers";
import fileUpload from "../../middlewares/file-upload";

const router = Router();

//ADD DRINK
router.post(
  "/products/drink/add",
  fileUpload.single("image"),
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

// UPDATE DRINK IN DATABASE
router.put("/products/drink/update/:id", drinksControllers.updateDrink);

// DELETE DRINK IN DATABASE
router.delete("/products/drink/delete/:id", drinksControllers.deleteDrink);

export default router;
