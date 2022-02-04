import { Router } from "express";

import dessertsControllers from "../../controllers/desserts-controllers";


/**
 * @api {get} /products/all-desserts Request All Desserts
 * @apiName GetDesserts
 * @apiGroup Desserts
 *
 *
 * @apiSuccess {String} All Desserts Return all Desserts on database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "_id": {
        "$oid": "61f41211b2f11ad6e5ddcd1f"
    },
    "name": "Fraisier",
    "ingredients": ["Farine ", "Sel ", "Beure", "Gélatine", "Oeuf", "Sucre", "Gousses de vanille", "Fécule de pomme de terre", "Zestes d’orange bio ", "Crème liquide entière", "Chocolat blanc", "Fraise gariguettes", "Jus de citrons", "Pate d’amande", "Pâte d’amande jaune"],
    "nutrients": [{
        "name": "proteins",
        "quantity": 3.31,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd20"
        }
    }, {
        "name": "carbohydrates",
        "quantity": 26.7,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd21"
        }
    }, {
        "name": "lipids",
        "quantity": 15.5,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd22"
        }
    }, {
        "name": "sugar",
        "quantity": 17.3,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd23"
        }
    }, {
        "name": "dietaryFiber",
        "quantity": 1.3,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd24"
        }
    }, {
        "name": "calcium",
        "quantity": 57.1,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd25"
        }
    }, {
        "name": "iron",
        "quantity": 1,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd26"
        }
    }, {
        "name": "magnesium",
        "quantity": 16.9,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd27"
        }
    }, {
        "name": "zinc",
        "quantity": 1,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd28"
        }
    }, {
        "name": "vitaminE",
        "quantity": 1.3,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd29"
        }
    }, {
        "name": "vitaminC",
        "quantity": 4.3,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd2a"
        }
    }, {
        "name": "vitaminB2",
        "quantity": 0.47,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd2b"
        }
    }, {
        "name": "vitaminB5",
        "quantity": 0.32,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd2c"
        }
    }, {
        "name": "vitaminB6",
        "quantity": 0.05,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd2d"
        }
    }, {
        "name": "vitaminB9",
        "quantity": 78.1,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd2e"
        }
    }, {
        "name": "vitaminB12",
        "quantity": 0.45,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd2f"
        }
    }, {
        "name": "starch",
        "quantity": 3.3,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd30"
        }
    }, {
        "name": "saturatedFattyAcid",
        "quantity": 8.3,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd31"
        }
    }, {
        "name": "monounsaturatedFattyAcid",
        "quantity": 3.94,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd32"
        }
    }, {
        "name": "sodiumChlorideSalt",
        "quantity": 0.15,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd33"
        }
    }, {
        "name": "potassium",
        "quantity": 105,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd34"
        }
    }, {
        "name": "sodium",
        "quantity": 61.7,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd35"
        }
    }, {
        "name": "solenium",
        "quantity": 15.1,
        "_id": {
            "$oid": "61f41211b2f11ad6e5ddcd36"
        }
    }],
    "image": "fraisier.jpg",
    "weight": 250,
    "description": "Un fraisier aux notes contemporaines, pour sublimer ce délicieux fruit d'été. Un dessert pétillant qui fait sensation en fin de repas !",
    "price": 9
}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

const router = Router();

//GET ALL DESSERTS
router.get("/products/all-desserts", dessertsControllers.getAllDesserts);

//GET ONE DESSERT BY ID
router.get("/products/dessert/:id", dessertsControllers.getDessertById);

//GET DESSERT BY NUTRIENT FILTER
router.get("/products/desserts", dessertsControllers.getDessertByFilter);

export default router;
