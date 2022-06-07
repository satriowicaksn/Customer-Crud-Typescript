import mongoose from "mongoose";
const Schema = mongoose.Schema;

/* Create Schema */
const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "customer",
    versionKey: false,
  }
);

const Customer = mongoose.model("customer", CustomerSchema);

export { Customer };
