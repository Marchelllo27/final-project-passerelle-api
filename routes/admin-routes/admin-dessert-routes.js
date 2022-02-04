import { Router } from "express";
import { body } from "express-validator";

import dessertsControllers from "../../controllers/desserts-controllers";
import fileUpload from "../../middlewares/file-upload";

const router = Router();

//ADD DESSERT
router.post(
  "/products/dessert/add",
  fileUpload.single("image"),
  body("name").trim().notEmpty().withMessage("le nom ne doit pas être vide !"),
  //body("ingredients").notEmpty(),
  //body("nutrients").notEmpty(),
  body("image").trim().notEmpty(),
  body("weight", "doit être numérique").trim().notEmpty().isNumeric(),
  body("description").trim().notEmpty(),
  body("price").trim().notEmpty().isNumeric(),
  dessertsControllers.addDessert
);
// UPDATE DESSERT IN DATABASE
router.put("/products/dessert/update/:id", dessertsControllers.updateDessert);

// DELETE DESSERT IN DATABASE
router.delete(
  "/products/dessert/delete/:id",
  dessertsControllers.deleteDessert
);

export default router;
