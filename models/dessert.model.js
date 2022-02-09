import * as fs from "fs"

import DessertsCollection from "../database/desserts.schema";
class Dessert {
  constructor(name, ingredients, nutrients, image, weight, description, price) {
    this.name = name;
    this.ingredients = ingredients;
    this.nutrients = nutrients;
    this.image = image;
    this.weight = weight;
    this.description = description;
    this.price = price;
  }

  // FIND DESSERT BY ID
  static findDessert(id) {
    return DessertsCollection.findById(id);
  }

  // FIND DESSERTS BY FILTER
  static findDessertFilter(filter = {}) {
    return DessertsCollection.find(filter);
  }

  //UPDATE DESSERT
  async updateDessert(id) {
    const dish = await this.findDessert(id);

    dish.name = this.name;
    dish.ingredients = this.ingredients;
    dish.nutrients = this.nutrients;
    dish.image = this.image;
    dish.weight = this.weight;
    dish.description = this.description;
    dish.price = this.price;
    await dish.save();
  }

  //ADD A DESSERT
  async addDessert() {
    await DessertsCollection.create({
      name: this.name,
      ingredients: this.ingredients,
      nutrients: this.nutrients,
      image: this.image,
      weight: this.weight,
      description: this.description,
      price: this.price,
    });
  }
  //find by name
  getDessertSameName() {
    return DessertsCollection.findOne({ name: this.name });
  }
  //dessert with name already exists

  async dessertExistAlready() {
    const dessertExist = await this.getDessertSameName();
    if (dessertExist) return true;
    if (!dessertExist) return false;
  }

  static deleteDessert(id) {
    const dessert = Dessert.findDessert(id);

    const imageName = dessert.image;
    fs.unlink(imageName, err => console.log(err));
    
    return DessertsCollection.findByIdAndDelete(id);
  }

}

export default Dessert;
