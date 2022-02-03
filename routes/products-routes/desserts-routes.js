import { Router } from "express";

import dessertsControllers from "../../controllers/desserts-controllers";

const router = Router();

//GET ALL DESSERTS
router.get("/products/all-desserts", dessertsControllers.getAllDesserts);

//GET ONE DESSERT BY ID
router.get("/products/dessert/:id", dessertsControllers.getDessertById);

//GET DESSERT BY NUTRIENT FILTER
router.get("/products/desserts", dessertsControllers.getDessertByFilter);

export default router;
