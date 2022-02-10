import HttpError from "../models/http-error";
import { validationResult } from "express-validator";

import Dish from "../models/dish.model";
import getNutrientComparisonValue from "../utils/getNutrientAverageValueToComparison";

// GET ALL DISHES
const getAllDishes = async (req, res, next) => {
  try {
    const allDishes = await Dish.findDishFilter();
    res.json(allDishes);
  } catch (error) {
    return next(new HttpError("Plats introuvables", 404));
  }
};

// GET A DISH BY ID
const getDishById = async (req, res, next) => {
  try {
    const foundDish = await Dish.findDishById(req.params.id);

    if (!foundDish) return next(new HttpError("Plat n'existe pas", 404));

    res.json(foundDish);
  } catch (error) {
    return next(new HttpError("Plat introuvable", 404));
  }
};

// GET DISHES BY FILTER

const getDishesByFilter = async (req, res, next) => {
  //get filters from query (.../...?filters)
  const nutrient = req.query.filters[0];

  //get average nutrient value for dishes
  const valueForNutriment = getNutrientComparisonValue(nutrient, "dishes");

  let filter;
  switch (nutrient) {
    case "vegetarian":
      filter = {
        type: "vegetarian",
      };
      break;
    case "":
      filter = {};
      break;
    default:
      filter = {
        nutrients: {
          $elemMatch: { name: nutrient, quantity: { $gt: valueForNutriment } },
        },
      };
  }

  // get only vegetarian dishes

  try {
    const filteredDishes = await Dish.findDishFilter(filter);

    if (!filteredDishes || filteredDishes.length === 0) {
      return next(
        new HttpError(
          "Malheuresement nous n'avons pas de plats qui correspondent à votre besoin 😔 ",
          404
        )
      );
    }

    res.json(filteredDishes);
  } catch (error) {
    return next(
      new HttpError(
        "Désolé, une erreur s'est produite lors de la recherche!",
        404
      )
    );
  }

  //Search dishesh in db by nutrient
  // try {
  //   const filteredDishesh = await Dish.findDishFilter({
  //     nutrients: {
  //       $elemMatch: { name: nutrient, quantity: { $gt: valueForNutriment } },
  //     },
  //   });

  //   res.json(filteredDishesh);
  // } catch (error) {
  //   return next(
  //     new HttpError(
  //       "Désolé, une erreur s'est produite lors de la recherche! ",
  //       404
  //     )
  //   );
  // }
};

// -------------------ADMIN DISHES ROUTES----------------------------

// ADD DISH
const addDish = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const dish = new Dish(
    req.body.name,
    req.body.ingredients,
    req.body.nutrients,
    req.body.image,
    // req.file.path,
    req.body.weight,
    req.body.description,
    req.body.type,
    req.body.price
  );
  try {
    const dishExist = await dish.dishExistAlready();
    if (dishExist) {
      return next(new HttpError("Сe plat existe déja ", 422));
    }

    await dish.addDish();
    res.status(201).json({ message: "Le plat a été bien ajouté" });
  } catch (error) {
    return next(new HttpError("Echec de l'ajout", 400));
  }
};

// UPDATE DISH
const updateDish = async (req, res, next) => {
  try {
    const dish = new Dish(
      req.body.name,
      req.body.ingredients,
      req.body.nutrients,
      req.body.image,
      // req.file.path,
      req.body.weight,
      req.body.description,
      req.body.type,
      req.body.price
    );
    await dish.upDateDish(req.params.id);
    res.json({ message: "Mise à jour effectuée!" });
  } catch (error) {
    next(new HttpError("Echec de la mise à jour ", 400));
  }
};

// DELETE DISH

const deleteDish = async (req, res, next) => {
  try {
    await Dish.deleteDishById(req.params.id);

    res.json({ message: "Le plat à été effacé" });
  } catch (error) {
    return next(new HttpError("Echec de la suppression", 400));
  }
};

export default {
  getAllDishes,
  getDishById,
  getDishesByFilter,
  addDish,
  updateDish,
  deleteDish,
};
