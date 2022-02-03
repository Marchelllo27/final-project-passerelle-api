import { Router } from "express";
import ordersControllers from "../controllers/orders-controllers";

const router = Router();

// GET ALL ORDERS (AUTH USER)
router.get("/auth-user/orders", ordersControllers.findAllOrders);

// Get order by Id
router.get("/auth-user/order/:id", ordersControllers.getOrderById);

//ADD ORDER
router.post("/orders/orderAdd", ordersControllers.addOrder);

// UPDATE ORDER
router.put("/orders/update/:id", ordersControllers.upDateOrder);

// DELETE ORDER
router.delete("/order/delete/:id", ordersControllers.deleteOrder);

export default router;
