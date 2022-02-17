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
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },

    totalPrice: { type: Number, required: true },

    user: {
      type: {
        email: { type: String, required: true },
        lastName: { type: String, required: true },
        firstName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        address: {
          type: {
            street: { type: String, required: true },
            postalCode: { type: String, required: true },
            city: { type: String, required: true },
          },
        },
      },
    },

  },
  schemaOptions
);

export default mongoose.model("Orders", OrdersSchema, "orders");
