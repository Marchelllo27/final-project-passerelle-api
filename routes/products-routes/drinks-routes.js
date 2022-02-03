import { Router } from "express";

import drinksControllers from "../../controllers/drinks-controllers";

const router = Router();

//GET ALL DRINKS
router.get("/products/all-drinks", drinksControllers.getAllDrinks);


// GET DRINK BY ID
router.get("/products/drink/:id", drinksControllers.getDrinkById);

// GET DRINKS BY FILTER
router.get("/products/drinks", drinksControllers.getDrinkByFilter);



export default router;
