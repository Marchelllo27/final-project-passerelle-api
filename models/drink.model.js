import bcrypt from "bcrypt";

import DrinksCollection from "../database/drinks.schema";

class Drink {
  constructor(name, ingredients, nutrients, image, weight, description, price) {
    this.name = name;
    this.ingredients = ingredients;
    this.nutrients = nutrients;
    this.image = image;
    this.weight = weight;
    this.description = description;
    this.price = price;
  }

  //Find a drink
  findDrink(id) {
    return DrinksCollection.findById(id);
  }

  static findDrinkFilter(filter = {}) {
    return DrinksCollection.find(filter);
  }

  async findByIdAndDelete(id) {
    return DrinksCollection.findByIdAndDelete(id);
  }
  
  //Update a drink
  async upDateDrink(id) {
    const drink = await this.findDrink(id);

    drink.name = this.name;
    drink.ingredients = this.ingredients;
    drink.nutrients = this.nutrients;
    drink.image = this.image;
    drink.weight = this.weight;
    drink.description = this.description;
    drink.price = this.price;
    await drink.save();
  }

  //add a drink
  async addDrink() {
    await DrinksCollection.create({
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
  getUDrinkSameName() {
    return DrinksCollection.findOne({ name: this.name });
  }
  //drink with name already exists

  async drinkExistAlready() {
    const drinkExist = await this.getUDrinkSameName();
    if (drinkExist) return true;
    if (!drinkExist) return false;
  }
  
}

export default Drink;
