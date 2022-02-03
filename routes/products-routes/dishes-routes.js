import { Router } from "express";

import dishesControllers from "../../controllers/dishes-controllers"

const router = Router();

//GET ALL DISHES
router.get("/products/all-dishes", dishesControllers.getAllDishes);

//GET ONE DISHE BY ID
router.get("/products/dish/:id", dishesControllers.getDishById);

//GET DISHES BY FILTER
router.get("/products/dishes", dishesControllers.getDishesByFilter);

export default router;
