import * as fs from "fs"

import DishesCollection from "../database/dishes.schema";
class Dish {
  constructor(
    name,
    ingredients,
    nutrients,
    image,
    weight,
    description,
    type,
    price
  ) {
    this.name = name;
    this.ingredients = ingredients;
    this.nutrients = nutrients;
    this.image = image;
    this.weight = weight;
    this.description = description;
    this.type = type;
    this.price = price;
  }

  // FIND DISH BY ID
  static findDishById(id) {
    return DishesCollection.findById(id);
  }

  // FIND DISHES BY FILTER

  static findDishFilter(filter = {}) {
    return DishesCollection.find(filter);
  }

  //UPDATE A DISH
  async upDateDish(id) {
    const dish = await Dish.findDishById(id);

    dish.name = this.name;
    dish.ingredients = this.ingredients;
    dish.nutrients = this.nutrients;
    dish.image = this.image;
    dish.weight = this.weight;
    dish.description = this.description;
    dish.type = this.type;
    dish.price = this.price;
    await dish.save();
  }

  //ADD A DISH
  async addDish() {
    await DishesCollection.create({
      name: this.name,
      ingredients: this.ingredients,
      nutrients: this.nutrients,
      image: this.image,
      weight: this.weight,
      description: this.description,
      type: this.type,
      price: this.price,
    });
  }

  //FIND WITH THE SAME NAME
  getDishSameName() {
    return DishesCollection.findOne({ name: this.name });
  }

  //DISH ALREADY EXIST
  async dishExistAlready() {
    const dishExist = await this.getDishSameName();
    if (dishExist) return true;
    if (!dishExist) return false;
  }

  // DELETE DISH BY ID
  static async deleteDishById(id) {

    const dish = await Dish.findDishById(id);

    const imageName = dish.image;
    fs.unlink(`uploads/images/dishes/${imageName}`, err => console.log(err));

    return DishesCollection.findByIdAndDelete(id);
  }
}

export default Dish;
