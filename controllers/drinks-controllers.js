import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import DrinksCollection from "../database/Drinks.schema";
import getNutrientComparisonValue from "../utils/getNutrientAverageValueToComparison";
import Drink from "../models/drink.model";

const getAllDrinks = async (req, res, next) => {
  try {
    const allDrinks = await DrinksCollection.find();
    res.json(allDrinks);
  } catch (error) {
    return next(new HttpError("Boissons introuvales", 404));
  }
};

const getDrinkById = async (req, res, next) => {
  try {
    const foundDrink = await DrinksCollection.findById(req.params.id);

    res.json(foundDrink);
  } catch (error) {
    return next(new HttpError("Boisson introuvable", 404));
  }
};

const getDrinkByFilter = async (req, res, next) => {
  //get filters from query (.../...?filters)
  const nutrient = req.query.filters[0];

  //get average nutrient value for drinks
  const valueForNutriment = getNutrientComparisonValue(nutrient, "drinks");

  //Search dishesh in db by nutrient
  try {
    const filteredDrinks = await DrinksCollection.find({
      nutrients: {
        $elemMatch: { name: nutrient, quantity: { $gt: valueForNutriment } },
      },
    });

    res.json(filteredDrinks);
  } catch (error) {
    return next(
      new HttpError(
        "Malheuresement nous n'avons pas de boisson qui correspont à votre besoin 😔 ",
        404
      )
    );
  }
};

//  ---------------admin drinks routes------------------

// ADD

const addDrink = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const drink = new Drink(
    req.body.name,
    req.body.ingredients,
    req.body.nutrients,
    req.body.image,
    req.body.weight,
    req.body.description,
    req.body.price
  );
  try {
    const drinkExist = await drink.drinkExistAlready();
    if (drinkExist) {
      return next(new HttpError("cette boisson existe déja ", 422));
    }

    await drink.addDrink();
    res.status(201).json({ message: "drink add" });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Echec de l'ajout", 400));
  }
};

// UPDATE

const updateDrink = async (req, res, next) => {
  console.log("update route is working");
  console.log(req.userData);

  try {
    const drink = new Drink(
      req.body.name,
      req.body.ingredients,
      req.body.nutrients,
      req.body.image,
      req.body.weight,
      req.body.description,
      req.body.price
    );
    await drink.upDateDrink(req.params.id);
    res.json({ message: "Mise à jour effectuée!" });
  } catch (error) {
    next(new HttpError("Echec de la mise à jour ", 400));
  }
};

// DELETE

const deleteDrink = async (req, res, next) => {
  try {
    await DrinksCollection.findByIdAndDelete(req.params.id);

    res.json({ message: "Le jus à été effacé" });
  } catch (error) {
    return next(new HttpError("Echec de la suppression", 400));
  }
};

export default {
  getAllDrinks,
  getDrinkById,
  getDrinkByFilter,
  addDrink,
  updateDrink,
  deleteDrink,
};
