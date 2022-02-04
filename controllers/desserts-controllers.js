import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import getNutrientComparisonValue from "../utils/getNutrientAverageValueToComparison";
import Dessert from "../models/dessert.model";

const getAllDesserts = async (req, res, next) => {
  try {
    const allDesserts = await Dessert.findDessertFilter();

    res.json(allDesserts);
  } catch (error) {
    return next(new HttpError("Desserts introuvales", 404));
  }
};

const getDessertById = async (req, res, next) => {
  try {
    const foundDessert = await Dessert.findDessert(req.params.id);
    res.json(foundDessert);
  } catch (error) {
    return next(new HttpError("Dessert introuvable", 404));
  }
};

const getDessertByFilter = async (req, res, next) => {
  //get filters from query (.../...?filters)
  const nutrient = req.query.filters[0];

  //get average nutrient value for desserts
  const valueForNutriment = getNutrientComparisonValue(nutrient, "desserts");

  //Search dishesh in db by nutrient
  try {
    const filteredDesserts = await findDessertFilter.find({
      nutrients: {
        $elemMatch: { name: nutrient, quantity: { $gt: valueForNutriment } },
      },
    });

    res.json(filteredDesserts);
  } catch (error) {
    return next(
      new HttpError(
        "Malheuresement nous n'avons pas de desserts qui correspondent à votre besoin 😔 ",
        404
      )
    );
  }
};

//  --------------- admin desserts routes -------------

// ADD
const addDessert = async (req, res, next) => {
  //console.log("add route is working");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const dessert = new Dessert(
    req.body.name,
    req.body.ingredients,
    req.body.nutrients,
    req.body.image,
    req.body.weight,
    req.body.description,
    req.body.price
  );
  try {
    const dessertExist = await dessert.dessertExistAlready();
    if (dessertExist) {
      return next(new HttpError("ce dessert existe déja ", 422));
    }
    await dessert.addDessert();
    res.status(201).json({ message: "Le dessert a été ajouté" });
  } catch (error) {
    return next(new HttpError("Echec de l'ajout", 400));
  }
};

// UPDATE

const updateDessert = async (req, res, next) => {
  //console.log("update route is working");

  try {
    const dessert = new Dessert(
      req.body.name,
      req.body.ingredients,
      req.body.nutrients,
      req.body.image,
      req.body.weight,
      req.body.description,
      req.body.price
    );
    await dessert.upDateDessert(req.params.id);
    res.json({ message: "Mise à jour effectuée!" });
  } catch (error) {
    next(new HttpError("Echec de la mise à jour ", 400));
  }
};

// DELETE
const deleteDessert = async (req, res, next) => {
  try {
    await Dessert.findByIdAndDelete(req.params.id);

    res.json({ message: "Le dessert à été éffacé" });
  } catch (error) {
    return next(new HttpError("Echec de la suppression", 400));
  }
};

export default {
  getAllDesserts,
  getDessertById,
  getDessertByFilter,
  addDessert,
  updateDessert,
  deleteDessert,
};
