import HttpError from "../models/http-error";
import Order from "../models/order.model";
import User from "../models/user.model";

//get on order by id
const getOrderById = async (req, res, next) => {
  try {
    const findOrder = await Order.findOrder(req.params.id);
    res.json(findOrder);
  } catch (error) {
    return next(new HttpError("Commande introuvable "), 404);
  }
};

//get all orders//
const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.getAllOrders();
    res.json(allOrders);
  } catch (error) {
    return next(new HttpError("Il n'y a aucunne commande", 404));
  }
};
//add an order
const addOrder = async (req, res, next) => {

  try {
    const user = await User.findUserById(req.userData.userId);
    //création de l'objet order
    const order = new Order(req.body.products, user, req.body.totalPrice);
    //envoie de l'objet créer a la bdd
    await order.addOrder();
    res.json({ message: "La commande a été ajoutée" });
  } catch (error) {
    return next(new HttpError("Echec de l'ajout la commande", 400));
  }
  res.json();
};

//Update an order
const upDateOrder = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.userData.userId);

    const order = new Order(req.body.products, user, req.body.totalPrice);
    await order.updateOrderByAdmin(req.params.id);

    res.json({ message: "La mise à jour de la commande a été bien effectuée!" });
  } catch (error) {
    return next(new HttpError("Echec de la mise à jour", 400));
  }
};

//Delete Order
const deleteOrder = async (req, res, next) => {
  try {
    await Order.deleteOrderByAdmin(req.params.id);
    res.json({ message: "La commande a été effacée" });
  } catch {
    return next(new HttpError("Echec de la suppression", 400));
  }
};

export default {
  getOrderById,
  getAllOrders,
  addOrder,
  upDateOrder,
  deleteOrder,
};
