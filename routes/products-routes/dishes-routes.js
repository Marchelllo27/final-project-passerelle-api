import { Router } from "express";

import dishesControllers from "../../controllers/dishes-controllers"

const router = Router();
/**
 * @api {get} /products/all-dishes Get All Dishes
 * @apiName GetDishes
 * @apiGroup Dishes
 *
 *
 * @apiSuccess {String} All-Desserts Return all Dishes on database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
        "_id": "61f58403cbdc09d76c95eb71",
        "name": "Salade composée avec viande",
        "ingredients": [
            "Jambon blanc,poulet,rôti de veau,vinaigre,moutarde,échalote,oignon,ail,cornichons,fines herbes,sel et poivre"
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 8.06,
                "_id": "61f58403cbdc09d76c95eb72"
            },
        ],
        "image": "salade-compose-viande.jpeg",
        "weight": 250,
        "description": "Cette salade vous est proposée par le docteur Benchetrit, fondateur de la Méthode Le Diet. La salade est nourrissante",
        "type": "",
        "price": 25
    },
    {
        "_id": "61f58403cbdc09d76c95eba6",
        "name": "Salade de pommes de terre, fait maison, végétarienne",
        "ingredients": [
            "Pommes de terre,oeufs,tomate cerise,ciboulette"
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 2.68,
                "_id": "61f58403cbdc09d76c95eba7"
            },
            {
                "name": "carbohydrates",
                "quantity": 9.9,
                "_id": "61f58403cbdc09d76c95eba8"
            }
        ],
        "image": "salade-de-pommes-de-terre.jpeg",
        "weight": 260,
        "description": "C'est l'un des plats les plus populaires dans la cuisine allemande, autrichienne et slave.",
        "type": "vegetarian",
        "price": 21
    }
]
 *
 * @apiError Dishes not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Plats introuvables"
 *     }
 */

//GET ALL DISHES
router.get("/products/all-dishes", dishesControllers.getAllDishes);



/**
 * @api {get} /products/dish/:id Get Dish 
 * @apiName GetDishById
 * @apiGroup Dishes
 *
 *
 * @apiSuccess {String} GET one dish by Id Return the
 * choosen dish (by his Id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
     {
        "_id": "61f58403cbdc09d76c95eba6",
        "name": "Salade de pommes de terre, fait maison, végétarienne",
        "ingredients": [
            "Pommes de terre,oeufs,tomate cerise,ciboulette"
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 2.68,
                "_id": "61f58403cbdc09d76c95eba7"
            },
            {
                "name": "carbohydrates",
                "quantity": 9.9,
                "_id": "61f58403cbdc09d76c95eba8"
            },
        ],
         "image": "salade-de-pommes-de-terre.jpeg",
        "weight": 260,
        "description": "C'est l'un des plats les plus populaires dans la cuisine allemande, autrichienne et slave.",
        "type": "vegetarian",
        "price": 21
    }  
]
 *
 * @apiError Dish not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Plat introuvable"
 *     }
 */

//GET ONE DISHE BY ID
router.get("/products/dish/:id", dishesControllers.getDishById);



/**
 * @api {get} /products/dishes?filters[]=proteins Get Dishes by nutrient filter
 * @apiName GetDishesByFilter
 * @apiGroup Dishes
 *
 *
 * @apiSuccess {String} GET Dishes by nutrient filter Return all dishes who containes the nutrient selected to filter ex: Zinc , vitaminA.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
     {
        "_id": "61f58403cbdc09d76c95eba6",
        "name": "Salade de pommes de terre, fait maison, végétarienne",
        "ingredients": [
            "Pommes de terre,oeufs,tomate cerise,ciboulette"
        ],
        "nutrients": [
            {
                "name": "proteins",
                "quantity": 2.68,
                "_id": "61f58403cbdc09d76c95eba7"
            },
            {
                "name": "carbohydrates",
                "quantity": 9.9,
                "_id": "61f58403cbdc09d76c95eba8"
            },
        ],
         "image": "salade-de-pommes-de-terre.jpeg",
        "weight": 260,
        "description": "C'est l'un des plats les plus populaires dans la cuisine allemande, autrichienne et slave.",
        "type": "vegetarian",
        "price": 21
    }  
]
 *
 * @apiError Dishes not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Malheuresement nous n'avons pas de plats qui correspondent à votre besoin 😔 "
 *     }
 */

//GET DISHES BY FILTER
router.get("/products/dishes", dishesControllers.getDishesByFilter);

export default router;
