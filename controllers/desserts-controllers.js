import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import getNutrientComparisonValue from "../utils/getNutrientAverageValueToComparison";
import Dessert from "../models/dessert.model";

// GET ALL DESSERTS
const getAllDesserts = async (req, res, next) => {
  try {
    const allDesserts = await Dessert.findDessertFilter();

    if (!allDesserts || allDesserts.length === 0) {
      return next(new HttpError("Malheureusement aucun dessert trouvé", 404));
    }

    res.json(allDesserts);
  } catch (error) {
    return next(
      new HttpError(
        "Désolé, une erreur s'est produite lors de la recherche!",
        404
      )
    );
  }
};

// GET DESSERT BY ID
const getDessertById = async (req, res, next) => {
  try {
    const foundDessert = await Dessert.findDessert(req.params.id);

    if (!foundDessert || foundDessert.length === 0) {
      return next(new HttpError("Malheureusement aucun dessert trouvé", 404));
    }

    res.json(foundDessert);
  } catch (error) {
    return next(
      new HttpError(
        "Désolé, une erreur s'est produite lors de la recherche!",
        404
      )
    );
  }
};

// GET DESSERT BY FILTER
const getDessertByFilter = async (req, res, next) => {
  //get filters from query (.../...?filters)
  const nutrient = req.query.filters[0];

  //get average nutrient value for desserts
  const valueForNutriment = getNutrientComparisonValue(nutrient, "desserts");

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

  //Search dessert in db by nutrient
  try {
    const filteredDesserts = await Dessert.findDessertFilter(filter);

    if (!filteredDesserts || filteredDesserts.length === 0) {
      return next(
        new HttpError(
          "Malheuresement nous n'avons pas le dessert qui correspont à votre besoin 😔",
          404
        )
      );
    }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const dessert = new Dessert(
    req.body.name,
    JSON.parse(req.body.ingredients),
    JSON.parse(req.body.nutrients),
    req.file.filename,
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
    res.status(201).json({ message: "Le dessert a été bien ajouté" });
  } catch (error) {
    return next(new HttpError("Echec de l'ajout", 400));
  }
};

// UPDATE

const updateDessert = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let imageData = req.body.image;

  if (req.file) {
    imageData = req.file.filename;
  }

  try {
    const dessert = new Dessert(
      req.body.name,
      JSON.parse(req.body.ingredients),
      JSON.parse(req.body.nutrients),
      imageData,
      req.body.weight,
      req.body.description,
      req.body.price
    );
    await dessert.updateDessert(req.params.id);
    res.json({ message: "Mise à jour effectuée!" });
  } catch (error) {
    next(new HttpError("Echec de la mise à jour ", 400));
  }
};

// DELETE
const deleteDessert = async (req, res, next) => {
  try {
    const dessert = await Dessert.deleteDessert(req.params.id);

    if (!dessert) {
      throw new Error("Echec de la suppression");
    }

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
