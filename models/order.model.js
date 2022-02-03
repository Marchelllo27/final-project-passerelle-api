import OrdersCollection from "../database/orders.schema";

class Order {
  constructor(products,user,totalPrice ) {
    this.products = products,
    this.user = user,
    this.totalPrice=totalPrice
  }

  //Find an order
  findOrder(id) {
      return OrdersCollection.findById(id);
    } 

  //Find all orders
   static async getAllOrders () {
      return OrdersCollection.find();
  }

  //Add an order
  async addOrder() {
    return OrdersCollection.create({
    products :this.products,
    user :this.user,
    totalPrice : this.totalPrice,
    });
  }

  //UpdateOrder
  async updateOrder(id){
    const order = await this.findOrder(id);
      order.products = this.products,
      order.user = this.user,
      order.totalPrice = this.totalPrice,
      await order.save();
  }
}

export default Order;
