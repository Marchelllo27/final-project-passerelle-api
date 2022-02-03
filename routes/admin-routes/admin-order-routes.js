import { Router } from "express";
//import ordersControllers from "../../controllers/orders-controllers";
import adminOrdersControllers from "../../controllers/auth-admin-order-controllers";

adminOrdersControllers;
const router = Router();


 //GET ALL ORDERS
router.get("/orders/allOrders", adminOrdersControllers.getAllOrders);

// GET ORDER BY ID
router.get("/orders/order/:id", adminOrdersControllers.getOrderById);

//ADD ORDER
router.post("/orders/orderAdd", adminOrdersControllers.addOrder);

// UPDATE ORDER
router.put("/orders/update/:id", adminOrdersControllers.upDateOrder);

// DELETE ORDER
router.delete("/order/delete/:id", adminOrdersControllers.deleteOrder);

export default router;
