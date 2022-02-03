import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "edited_at" },
  versionKey: false,
};

const OrdersSchema = new Schema(
  {
    products: {
      type: [
        {
          name: { type: String, required: false },
          quantity: { type: Number, required: false },
          price: { type: Number, required: false },
        },
      ],
      required: true,
    },

    totalPrice: { type: Number, required: false },

    user: {
      type: {
        email: { type: String, required: false },
        lastName: { type: String, required: false },
        firstName: { type: String, required: false },
        phoneNumber: { type: Number, required: false },
        address: {
          type: {
            street: { type: String, required: false },
            postalCode: { type: String, required: false },
            city: { type: String, required: false },
          },
        },
      },
    },

    totalPrice : {type: Number, required: true}
  },
  schemaOptions
);

export default mongoose.model("Orders", OrdersSchema, "orders");
