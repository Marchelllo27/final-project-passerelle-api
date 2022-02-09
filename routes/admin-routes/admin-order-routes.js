import { Router } from "express";
//import ordersControllers from "../../controllers/orders-controllers";
import adminOrdersControllers from "../../controllers/auth-admin-order-controllers";

adminOrdersControllers;
const router = Router();
/**
 * @api {get} /orders/allOrders Get All Orders 
 * @apiGroup Orders-Admin
 *
 
 * @apiSuccess {String} Get Get all the orders for an authenticate Admin.
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
 *     { message: "Il n'y a aucunne commande" }
 * 
 */

 //GET ALL ORDERS
router.get("/orders/allOrders", adminOrdersControllers.getAllOrders);


/**
 * @api {get} /orders/order/:id Get Order 
 * @apiGroup Orders-Admin
 *
 
 * @apiSuccess {String} Get Get one order for an authenticate Admin.
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

// GET ORDER BY ID
router.get("/orders/order/:id", adminOrdersControllers.getOrderById);


/**
 * @api {post} /orders/orderAdd Add Order 
 * @apiGroup Orders-Admin
 *
 
 * @apiSuccess {String} Post Add an order 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La commande a été ajoutée" }
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de l'ajout la commande" }
 */

//ADD ORDER
router.post("/orders/orderAdd", adminOrdersControllers.addOrder);


/**
 * @api {put} //orders/update/:id Update Order 
 * @apiName UpDateOrder
 * @apiGroup Orders-Admin
 *
 
 * @apiSuccess {String} Put Update order 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La mise à jour de la commande a été bien effectuée!" }
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la mise à jour" }
 */

// UPDATE ORDER
router.put("/orders/update/:id", adminOrdersControllers.upDateOrder);


/**
 * @api {delate} /order/delete/:id Delete Order  
 * @apiName DeleteOrder
 * @apiGroup Orders-Admin
 *
 
 * @apiSuccess {String} Delete Delete an order with id by an authenticate Admin 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{ "message": "La commande a été effacée"}
 * 
 * @apiError Bad Request Error HTTP 400 . 
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request 
 *     { message: "Echec de la suppression" }
 */


// DELETE ORDER
router.delete("/order/delete/:id", adminOrdersControllers.deleteOrder);

export default router;
