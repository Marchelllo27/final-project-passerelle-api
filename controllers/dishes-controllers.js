import HttpError from "../models/http-error";
import {validationResult } from "express-validator";

import Dish from "../models/dish.model";
import getNutrientComparisonValue from "../utils/getNutrientAverageValueToComparison";

// GET ALL DISHES
const getAllDishes = async (req, res, next) => {
  try {
    const allDishes = await Dish.findDishFilter();
    res.json(allDishes);
  } catch (error) {
    console.log(error)
        return next(new HttpError("Plats introuvables", 404));
  }
}


// GET A DISH BY ID 
const getDishById = async (req, res, next) => {
  try {
    // const id = ObjectId(req.params.id);
    // const foundDish = await DishesCollection.findOne({ _id: id });
    //good solution for to lines above(marc)
    const foundDish = await Dish.findById(req.params.id);
    res.json(foundDish);
  } catch (error) {
     return next(new HttpError("Plat introuvable", 404));

  }
}


// GET DISHES BY FILTER

 const getDishesByFilter = async (req, res, next) => {
  //get filters from query (.../...?filters)
  const nutrient = req.query.filters[0];

  // get only vegetarian dishes
  if (nutrient === "vegetarian") {
    try {
      const filteredVeganDishesh = await Dish.findDishtFilter({
        type: "vegetarian",
      });

      res.json(filteredVeganDishesh);
    } catch (error) {
        return next(
          new HttpError(
            "Malheuresement nous n'avons pas de plat qui correspont à votre besoin 😔 ",
            404
          )
        );
    }
    return;
  }

  //get average nutrient value for dishes
  const valueForNutriment = getNutrientComparisonValue(nutrient, "dishes");

  //Search dishesh in db by nutrient
  try {
    const filteredDishesh = await Dish.findDishtFilter({
      nutrients: {
        $elemMatch: { name: nutrient, quantity: { $gt: valueForNutriment } },
      },
    });

    res.json(filteredDishesh);
  } catch (error) {
    return next(error);
  }
}

// -------------------admin dishes routes----------------------------

// ADD DISH
const addDish = async (req, res, next) => {
 

  const errors=validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const dish = new Dish(
    req.body.name,
    req.body.ingredients,
    req.body.nutrients,
    req.body.image,
    req.body.weight,
    req.body.description,
    req.body.type,
    req.body.price
  );
  try {
    const dishExist=await dish.dishExistAlready();
    if(dishExist){
      return next(new HttpError("ce plat existe déja ", 422));
    }

    await dish.addDish();
    res.status(201).json({ message: "dish add" });
  } catch (error) {
            console.log(error);

    return next(new HttpError("Echec de l'ajout", 400));
  }
}


// UPDATE DISH

const updateDish = async (req, res, next) => {
 

  try {
    const dish = new Dish(
      req.body.name,
      req.body.ingredients,
      req.body.nutrients,
      req.body.image,
      req.body.weight,
      req.body.description,
      req.body.type,
      req.body.price
    );
    await dish.upDateDish(req.params.id);
    res.json({ message: "La mise à jour effectuée!" });
  } catch (error) {
     next(new HttpError("Echec de la mise à jour ", 400));
  }
}

// DELETE DISH

const deleteDish = async (req, res, next) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);

    res.json({ message: "Le plat à été effacé" });
  } catch (error) {
      return next(new HttpError("Echec de la suppression", 400));    }
}

export default {
  getAllDishes,
  getDishById,
  getDishesByFilter,
  addDish,
  updateDish,
  deleteDish
}