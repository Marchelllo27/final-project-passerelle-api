import { Router } from "express";
import ordersControllers from "../controllers/orders-controllers";

const router = Router();



/**
 * @api {get} /auth-user/orders Get all Orders  
 * @apiName GetOrders
 * @apiGroup Orders-Auth-User
 *
 
 * @apiSuccess {String} Get Get all the orders for an authenticate User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
    {
        "_id": "61fd34a076234a5be0742274",
        "products": [
            {
                "name": "jus",
                "quantity": 5,
                "price": 4,
                "_id": "61fd34a076234a5be0742275"
            }
        ],
        "totalPrice": 222,
        "user": {
            "email": "hibaaaa@test.com",
            "lastName": "John",
            "firstName": "test",
            "phoneNumber": 783881567,
            "address": {
                "street": "22 rue de la bastille",
                "postalCode": "92550",
                "city": "Test-City",
                "_id": "61fd34a076234a5be0742277"
            },
            "_id": "61fbb74e14ac8b883c7d698c"
        },
        "created_at": "2022-02-04T14:13:52.608Z",
        "edited_at": "2022-02-04T14:13:52.608Z"
    },
    {
        "_id": "61fd34a076234a5be0742274",
        "products": [
            {
                "name": "jus",
                "quantity": 5,
                "price": 4,
                "_id": "61fd34a076234a5be0742275"
            }
        ],
        "totalPrice": 222,
        "user": {
            "email": "test@test.com",
            "lastName": "doe",
            "firstName": "test",
            "phoneNumber": 783881534,
            "address": {
                "street": "22 rue de la trinite",
                "postalCode": "92250",
                "city": "TParis,
                "_id": "61fd34a076234a6be0744422"
            },
            "_id": "61fbb74e14ac8b883c7d456c"
        },
        "created_at": "2022-02-04T15:13:52.608Z",
        "edited_at": "2022-02-04T15:13:52.608Z"
    }
]
 * 
 * @apiError Not Found Erreur HTTP 404   
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "Désolé, vous n'avez aucune commande." }
 * 
 * @apiError Not Found Erreur HTTP 404   
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "Malheureusement, impossible de trouver vos commandes." }
 */

// GET ALL ORDERS (AUTH USER)
router.get("/auth-user/orders", ordersControllers.findAllOrders);


/**
 * @api {get} /auth-user/order/:id Get Order 
 * @apiName GetOrder
 * @apiGroup Orders-Auth-User
 *
 
 * @apiSuccess {String} Get Get one order for an authenticate User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
    {
        "_id": "61fd34a076234a5be0742274",
        "products": [
            {
                "name": "jus",
                "quantity": 5,
                "price": 4,
                "_id": "61fd34a076234a5be0742275"
            }
        ],
        "totalPrice": 222,
        "user": {
            "email": "hibaaaa@test.com",
            "lastName": "John",
            "firstName": "test",
            "phoneNumber": 783881567,
            "address": {
                "street": "22 rue de la bastille",
                "postalCode": "92550",
                "city": "Test-City",
                "_id": "61fd34a076234a5be0742277"
            },
            "_id": "61fbb74e14ac8b883c7d698c"
        },
        "created_at": "2022-02-04T14:13:52.608Z",
        "edited_at": "2022-02-04T14:13:52.608Z"
    }
]
 * 
 * @apiError Not Found Erreur HTTP 404   
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found	
 *     { message: "Commande introuvable" }
 */

// Get order by Id
router.get("/auth-user/order/:id", ordersControllers.getOrderById);


/**
 * @api {post} /auth-user/order/add Add Order 
 * @apiName AddOrder
 * @apiGroup Orders-Auth-User
 *
 
 * @apiSuccess {String} Post Add an order by an authenticate User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La commande a été bien ajoutée" }
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Échec de l'ajout la commande" }
 */

//ADD ORDER
router.post("/auth-user/order/add", ordersControllers.addOrder);

/**
 * @api {put} /auth-user/order/update/:id UpDate Order 
 * @apiName UpDateOrder
 * @apiGroup Orders-Auth-User
 *
 
 * @apiSuccess {String} Put Update an order with his id by an authenticate User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La mise à jour de la commande a été bien effectuée!" }
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Échec de la mise à jour" }
 */

// UPDATE ORDER
router.put("/auth-user/order/update/:id", ordersControllers.upDateOrder);


/**
 * @api {post} /auth-user/order/add Add Order 
 * @apiName PostOrder
 * @apiGroup Orders-Auth-User
 *
 
 * @apiSuccess {String} Post Add an order by an authenticate User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La commande a été bien ajoutée" }
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Échec de l'ajout la commande" }
 */

//ADD ORDER
router.post("/auth-user/order/add", ordersControllers.addOrder);

/**
 * @api {delete} /auth-user/order/delete/:id Delete Order 
 * @apiName DeleteOrder
 * @apiGroup Orders-Auth-User
 *
 
 * @apiSuccess {String} Delete Delete an order with his id by an authenticate User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La commande a été effacée"}
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Échec de la suppression" }
 */

// DELETE ORDER
router.delete("/auth-user/order/delete/:id", ordersControllers.deleteOrder);

export default router;
