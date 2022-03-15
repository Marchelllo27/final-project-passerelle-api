import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import getNutrientComparisonValue from "../utils/getNutrientAverageValueToComparison";
import Drink from "../models/drink.model";

const getAllDrinks = async (req, res, next) => {
  try {
    const allDrinks = await Drink.findDrinkFilter();

    if (!allDrinks || allDrinks.length === 0) {
      return next(
        new HttpError("Malheureusement, aucune boisson trouvée", 404)
      );
    }
    res.json(allDrinks);
  } catch (error) {
    return next(
      new HttpError(
        "Une erreur s'est produite lors de la recherche de boissons",
        404
      )
    );
  }
};

const getDrinkById = async (req, res, next) => {
  try {
    const foundDrink = await Drink.findDrink(req.params.id);

    if (!foundDrink) {
      return next(
        new HttpError("Malheureusement, aucune boisson trouvée", 404)
      );
    }

    res.json(foundDrink);
  } catch (error) {
    return next(
      new HttpError(
        "Une erreur s'est produite lors de la recherche de boissons",
        404
      )
    );
  }
};

const getDrinkByFilter = async (req, res, next) => {
  //get filters from query (.../...?filters)
  const nutrient = req.query.filters[0];

  //get average nutrient value for drinks
  const valueForNutriment = getNutrientComparisonValue(nutrient, "drinks");

  let filter;
  if (nutrient.trim() === "") {
    filter = {};
  } else {
    filter = {
      nutrients: {
        $elemMatch: { name: nutrient, quantity: { $gt: valueForNutriment } },
      },
    };
  }

  //Search dishesh in db by nutrient
  try {
    const filteredDrinks = await Drink.findDrinkFilter(filter);

    if (!filteredDrinks || filteredDrinks.length === 0) {
      return next(
        new HttpError(
          "Malheuresement nous n'avons pas de boisson qui correspont à votre besoin 😔",
          404
        )
      );
    }

    res.json(filteredDrinks);
  } catch (error) {
    return next(
      new HttpError(
        "Une erreur s'est produite lors de la recherche de boissons",
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
    JSON.parse(req.body.ingredients),
    JSON.parse(req.body.nutrients),
    req.file.filename,
    req.body.weight,
    req.body.description,
    req.body.price
  );
  try {
    const drinkExist = await drink.drinkExistAlready();
    if (drinkExist) {
      return next(new HttpError("Cette boisson existe déja", 422));
    }

    await drink.addDrink();
    return res.status(201).json({ message: "La boisson a été bien ajouté" });
  } catch (error) {
    return next(new HttpError("Echec de l'ajout", 400));
  }
};

// UPDATE
const updateDrink = async (req, res, next) => {
  try {
    const drink = new Drink(
      req.body.name,
      req.body.ingredients,
      req.body.nutrients,
      // req.body.image,
      req.file.path,
      req.body.weight,
      req.body.description,
      req.body.price
    );
    await drink.updateDrink(req.params.id);
    return res.json({ message: "Mise à jour effectuée!" });
  } catch (error) {
    return next(new HttpError("Echec de la mise à jour ", 400));
  }
};

// DELETE

const deleteDrink = async (req, res, next) => {
  try {
    await Drink.deleteDrinkById(req.params.id);

    res.json({ message: "La boisson à été effacée" });
  } catch (error) {
    console.log(error)
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
