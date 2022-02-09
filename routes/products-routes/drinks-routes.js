import { Router } from "express";

import drinksControllers from "../../controllers/drinks-controllers";

const router = Router();

/**
 * @api {get} /products/all-drinks Get All Drinks
 * @apiName GetDrinks
 * @apiGroup Drinks
 *
 *
 * @apiSuccess {String} All-Drinks Return all Drinks on database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
     {
        "_id": "61f41211b2f11ad6e5ddcbca",
        "name": "Jus de carotte",
        "ingredients": [
            "Carottes",
            "orange",
            "gingembre frais",
            "citron"
        ],
        "nutrients": [
            {
                "name": "lipids",
                "quantity": 0.1,
                "_id": "61f41211b2f11ad6e5ddcbcb"
            },
            {
                "name": "sugar",
                "quantity": 5.95,
                "_id": "61f41211b2f11ad6e5ddcbcc"
            }
        ],
        "image": "jus-de-carrote.jpeg",
        "weight": 250,
        "description": "A de la carotte prévie nt l'appariti on des rides  et améliore  l’élastici té de  vo tre peau.En  outre  riches  en  fibres  sont  bénéfiques  pour  le  système  digestif.\"",
        "price": 7
    },
    {
        "_id": "61f41211b2f11ad6e5ddcc3f",
        "name": "Jus d'orange, maison",
        "ingredients": [
            ""
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 0.7,
                "_id": "61f41211b2f11ad6e5ddcc40"
            },
            {
                "name": "carbohydrates",
                "quantity": 9.4,
                "_id": "61f41211b2f11ad6e5ddcc41"
            }
        ],
        "image": "jus d'orange maison.png",
        "weight": 150,
        "description": "Jus d'orange bio préssé, le meilleur moyen de faire plein de vitamine C",
        "price": 7
    }  
]
 *
 * @apiError Drinks not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Jus introuvales"
 *     }
 */

//GET ALL DRINKS
router.get("/products/all-drinks", drinksControllers.getAllDrinks);

/**
 * @api {get} /products/drink/:id Get Drink
 * @apiName GetDrink
 * @apiGroup Drinks
 *
 *
 * @apiSuccess {String} Get one drink by Id Return the choosen drinj (by his Id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
    {
        "_id": "61f41211b2f11ad6e5ddcc3f",
        "name": "Jus d'orange, maison",
        "ingredients": [
            ""
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 0.7,
                "_id": "61f41211b2f11ad6e5ddcc40"
            },
            {
                "name": "carbohydrates",
                "quantity": 9.4,
                "_id": "61f41211b2f11ad6e5ddcc41"
            }
        ],
        "image": "jus d'orange maison.png",
        "weight": 150,
        "description": "Jus d'orange bio préssé, le meilleur moyen de faire plein de vitamine C",
        "price": 7
    }  
]
 *
 * @apiError Drink not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Jus introuvale"
 *     }
 */


// GET DRINK BY ID
router.get("/products/drink/:id", drinksControllers.getDrinkById);

/**
 * @api {get} /products/drinks?filters[]=proteins Get Drinks by nutrient filter
 * @apiName GetDrinksByFilter
 * @apiGroup Drinks
 *
 *
 * @apiSuccess {String} GET Drinks by nutrient filter Return all drinks who containes the nutrient selected to filter ex: Zinc , vitaminA.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
     {
        "_id": "61f41211b2f11ad6e5ddcbca",
        "name": "Jus de carotte",
        "ingredients": [
            "Carottes",
            "orange",
            "gingembre frais",
            "citron"
        ],
        "nutrients": [
            {
                "name": "lipids",
                "quantity": 0.1,
                "_id": "61f41211b2f11ad6e5ddcbcb"
            },
            {
                "name": "sugar",
                "quantity": 5.95,
                "_id": "61f41211b2f11ad6e5ddcbcc"
            }
        ],
        "image": "jus-de-carrote.jpeg",
        "weight": 250,
        "description": "A de la carotte prévie nt l'appariti on des rides  et améliore  l’élastici té de  vo tre peau.En  outre  riches  en  fibres  sont  bénéfiques  pour  le  système  digestif.\"",
        "price": 7
    }
]
 *
 * @apiError Drinks not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Malheuresement nous n'avons pas de jus qui correspondent à votre besoin 😔 "
 *     }
 */

// GET DRINKS BY FILTER
router.get("/products/drinks", drinksControllers.getDrinkByFilter);



export default router;
