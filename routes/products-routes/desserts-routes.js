import { Router } from "express";

import dessertsControllers from "../../controllers/desserts-controllers";

const router = Router();


/**
 * @api {get} /products/all-desserts Request All Desserts
 * @apiName GetDesserts
 * @apiGroup Desserts
 *
 *
 * @apiSuccess {String} All-Desserts Return all Desserts on database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
    {
         "_id": "61f41211b2f11ad6e5ddcd1f",
        "name": "Fraisier",
        "ingredients": [
            "Farine ",
            "Sel ",
            "Beure",
            "Gélatine",
            "Oeuf"
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 3.31,
                "_id": "61f41211b2f11ad6e5ddcd20"
            },
            {
                "name": "carbohydrates",
                "quantity": 26.7,
                "_id": "61f41211b2f11ad6e5ddcd21"
            },
        ],
        "image": "fraisier.jpg",
        "weight": 250,
        "description": "Un fraisier aux notes contemporaines, pour sublimer ce délicieux fruit d'été. Un dessert pétillant qui fait sensation en fin de repas !",
        "price": 9
    },
    {
        "_id": "61f41211b2f11ad6e5ddcd06",
        "name": "Opéra",
        "ingredients": [
            "Farine ",
            "Chocolat noir ",
            "Crème liquide entière",
            "Huile de pépins de raisins"
        ],
        "nutrients": [
             {
                "name": "lipids",
                "quantity": 24,
                "_id": "61f41211b2f11ad6e5ddcd09"
            },
            {
                "name": "sugar",
                "quantity": 35.1,
                "_id": "61f41211b2f11ad6e5ddcd0a"
            }
        ],
        "image": "opera.jpg",
        "weight": 250,
        "description": "L’opéra est un grand classique de la pâtisserie française. Il est né au milieu du 20e siècle et les maisons Dalloyau et Lenôtre en revendiquent toutes les deux la création. C’est un entremets raffiné digne d’être la douceur de vos repas !",
        "price": 10
    }  
]
 *
 * @apiError Desserts not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Desserts introuvales"
 *     }
 */

//GET ALL DESSERTS
router.get("/products/all-desserts", dessertsControllers.getAllDesserts);


/**
 * @api {get} /products/dessert/:id Request One Dessert
 * @apiName GetDessert
 * @apiGroup Desserts
 *
 *
 * @apiSuccess {String} Get one dessert by Id Return one the choosen dessert (by his Id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
    {
         "_id": "61f41211b2f11ad6e5ddcd1f",
        "name": "Fraisier",
        "ingredients": [
            "Farine ",
            "Sel ",
            "Beure",
            "Gélatine",
            "Oeuf"
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 3.31,
                "_id": "61f41211b2f11ad6e5ddcd20"
            },
            {
                "name": "carbohydrates",
                "quantity": 26.7,
                "_id": "61f41211b2f11ad6e5ddcd21"
            },
        ],
        "image": "fraisier.jpg",
        "weight": 250,
        "description": "Un fraisier aux notes contemporaines, pour sublimer ce délicieux fruit d'été. Un dessert pétillant qui fait sensation en fin de repas !",
        "price": 9
    }  
]
 *
 * @apiError Dessert not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Dessert introuvale"
 *     }
 */

//GET ONE DESSERT BY ID
router.get("/products/dessert/:id", dessertsControllers.getDessertById);


/**
 * @api {get} //products/drinks?filters[]=proteins Request Dessert by nutrient filter
 * @apiName GetDessertByFilter
 * @apiGroup Desserts
 *
 *
 * @apiSuccess {String} GET Dessert by nutrient filter Return all desserts who containes the nutrient selected to filter ex: Zinc , vitaminA.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
    {
         "_id": "61f41211b2f11ad6e5ddcd1f",
        "name": "Fraisier",
        "ingredients": [
            "Farine ",
            "Sel ",
            "Beure",
            "Gélatine",
            "Oeuf"
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 3.31,
                "_id": "61f41211b2f11ad6e5ddcd20"
            },
            {
                "name": "carbohydrates",
                "quantity": 26.7,
                "_id": "61f41211b2f11ad6e5ddcd21"
            },
        ],
        "image": "fraisier.jpg",
        "weight": 250,
        "description": "Un fraisier aux notes contemporaines, pour sublimer ce délicieux fruit d'été. Un dessert pétillant qui fait sensation en fin de repas !",
        "price": 9
    }  
]
 *
 * @apiError Dessert not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Malheuresement nous n'avons pas le dessert qui correspont à votre besoin 😔 "
 *     }
 */
//GET DESSERT BY NUTRIENT FILTER
router.get("/products/desserts", dessertsControllers.getDessertByFilter);

export default router;
