import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "edited_at" },
  versionKey: false,
};

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: "USER",
      required: false,
    },

    lastName: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: false,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  schemaOptions
);

export default mongoose.model("Users", UsersSchema, "users");

//