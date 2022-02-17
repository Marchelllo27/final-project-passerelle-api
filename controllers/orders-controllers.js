import HttpError from "../models/http-error";

import Order from "../models/order.model";
import User from "../models/user.model";

// FIND ALL AUTH USER ORDERS

const findAllOrders = async (req, res, next) => {
  // get userId from token(we added decoded token to req.userData)
  const userId = req.userData.userId;
  try {
    const orders = await Order.getAllOrders({ "user._id": userId });
    if (!orders || orders.length === 0) {
      return next(new HttpError("Désolé, vous n'avez aucune commande.", 404));
    }
    return res.json(orders);
  } catch (error) {
    next(
      new HttpError("Malheureusement, impossible de trouver vos commandes", 404)
    );
  }
};

//GET AN ORDER BY ID
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOrder(req.params.id);

    if (order.user.id === req.userData.userId) {
      return res.json(order);
    } else {
      throw new Error("Commande introuvable");
    }
  } catch (error) {
    return next(new HttpError("Commande introuvable"), 404);
  }
};

//ADD an order
const addOrder = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.userData.userId);
    if (user) {
      const order = new Order(req.body.products, user, parse.Float(req.body.totalPrice));
      await order.addOrder();
      res.json({ message: "La commande a été bien ajoutée" });
    } else {
      return next(new HttpError("Vous ne pouvez pas créer de commande", 401));
    }
  } catch (error) {
    console.log(error);
    return next(new HttpError(error.message, 411));
    return next(new HttpError("Echec de l'ajout la commande", 400));
  }
};

//UPDATE an order
const upDateOrder = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.userData.userId);

    const order = new Order(req.body.products, user, req.body.totalPrice);

    await order.updateOrder(req.params.id, req.userData.userId);

    res.json({
      message: "La mise à jour de la commande a été bien effectuée!",
    });
  } catch (error) {
    return next(new HttpError("Echec de la mise à jour", 400));
  }
};

//DELETE Order
const deleteOrder = async (req, res, next) => {
  try {
    await Order.deleteOrderById(req.params.id, req.userData.userId);
    res.json({ message: "La commande a bien été effacée" });
  } catch {
    return next(new HttpError("Echec de la suppression", 400));
  }
};

export default {
  findAllOrders,
  getOrderById,
  addOrder,
  upDateOrder,
  deleteOrder,
};
