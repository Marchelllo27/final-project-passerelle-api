import OrdersCollection from "../database/orders.schema";

class Order {
  constructor(products, user, totalPrice) {
    (this.products = products),
      (this.user = user),
      (this.totalPrice = totalPrice);
  }

  //Find all orders
  static getAllOrders(filter = {}) {
    return OrdersCollection.find(filter);
  }

  //Find an order
  static findOrder(id) {
    return OrdersCollection.findById(id);
  }

  //Add an order
  async addOrder() {
    return OrdersCollection.create({
      products: this.products,
      user: this.user,
      totalPrice: this.totalPrice,
    });
  }

  //UpdateOrder
  async updateOrder(orderId, userId) {
    const order = await Order.findOrder(orderId);

    if (order.user.id === userId) {
       (order.products = this.products),
       (order.user = this.user),
       (order.totalPrice = this.totalPrice),
       await order.save();
      return;
    } else {
      throw new Error("Echec de la mise à jour");
    }
  }

  // updateOrderByAdmin
  async updateOrderByAdmin(orderId) {
    const order = await Order.findOrder(orderId);
    if (!order) throw new Error("Introuvable");

    (order.products = this.products),
      (order.user = this.user),
      (order.totalPrice = this.totalPrice),
      await order.save();
  }

  // DELETE
  static async deleteOrderById(orderId, userId) {
    const order = await Order.findOrder(orderId);
    if (order.user.id === userId) {
      return OrdersCollection.findByIdAndDelete(orderId);
    } else {
      throw new Error("Echec de la suppression");
    }
  }

  // DELETE BY ADMIN

  static async deleteOrderByAdmin(orderId) {
    const order = await Order.findOrder(orderId);
    if (!order) throw new Error("Introuvable")
    return OrdersCollection.findByIdAndDelete(orderId);
  }
}

export default Order;
