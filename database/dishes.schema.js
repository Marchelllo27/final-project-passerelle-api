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
      required: true,
    },
    nutrients: {
      type: [
        {
          name: { type: String, required: true},
          quantity: { type: Number, required: true},
        },
      ],
    },

    image: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  schemaOptions
);

export default mongoose.model("Dishes", DishesSchema, "dishes");
