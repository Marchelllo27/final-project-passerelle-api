import * as fs from "fs"

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

  //FIND DRINK BY ID
  static findDrink(id) {
    return DrinksCollection.findById(id);
  }

  // FIND DRINK BY FILTER
  static findDrinkFilter(filter = {}) {
    return DrinksCollection.find(filter);
  }
  
  //UPDATE DRINK
  async updateDrink(id) {
    const drink = await Drink.findDrink(id);

    drink.name = this.name;
    drink.ingredients = this.ingredients;
    drink.nutrients = this.nutrients;
    drink.image = this.image;
    drink.weight = this.weight;
    drink.description = this.description;
    drink.price = this.price;
    await drink.save();
  }

  //ADD DRINK
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

  //FIND WITH THE SAME NAME
  getDrinkSameName() {
    return DrinksCollection.findOne({ name: this.name });
  }

  //DRINK ALREADY EXIST
  async drinkExistAlready() {
    const drinkExist = await this.getDrinkSameName();
    if (drinkExist) return true;
    if (!drinkExist) return false;
  }


  // DELETE DRINK
  static async deleteDrinkById(id) {

    const drink = await Drink.findDrink(id);

    const imageName = drink.image;
    fs.unlink(`uploads/images/drinks/${imageName}`, err => console.log(err));

    return DrinksCollection.findByIdAndDelete(id);
  }
  
}

export default Drink;
