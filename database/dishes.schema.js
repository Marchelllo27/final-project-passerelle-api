import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schemaOptions = {
  versionKey: false,
};


const DishesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: false,
    },
    nutrients: {
      type: [
        {
          name: { type: String, required: false },
          quantity: { type: Number, required: false },
        },
      ],
      required: false
    },

    image: {
      type: String,
      required: false,
    },

    weight: {
      type: Number,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  schemaOptions
);

export default mongoose.model("Dishes", DishesSchema, "dishes");
