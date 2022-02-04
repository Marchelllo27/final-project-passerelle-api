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

  // find a dessert
  findDessert(id) {
    return DessertsCollection.findById(id);
  }

  static findDessertFilter(filter = {}) {
    return DessertsCollection.find(filter);
  }

  async findByIdAndDelete(id) {
    return DessertsCollection.findByIdAndDelete(id);
  }

  //update a dessert
  async upDateDessert(id) {
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

  //add a dessert
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
  getUDessertSameName() {
    return DessertsCollection.findOne({ name: this.name });
  }
  //dessert with name already exists

  async dessertExistAlready() {
    const dessertExist = await this.getUDessertSameName();
    if (dessertExist) return true;
    if (!dessertExist) return false;
  }
}

export default Dessert;
