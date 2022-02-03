
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

  // find a dish
  findDish(id) {
    return DishesCollection.findById(id);
  }

  async findDishtFilter(filter = {}) {
    return DishesCollection.find(filter);
  }

  async findByIdAndDelete(id) {
    return DishesCollection.findByIdAndDelete(id);
  }

  //update a dish
  async upDateDish(id) {
    const dish = await this.findDish(id);

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

  //add a dish
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

  //find by name
  getUDishSameName() {
    return DishesCollection.findOne({ name: this.name });
  }

  //dish with name already exists

  async dishExistAlready() {
    const dishExist = await this.getUDishSameName();
    if (dishExist) return true;
    if (!dishExist) return false;
  }
}

export default Dish;
