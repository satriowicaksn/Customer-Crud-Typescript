import { Customer } from "../models/Customer";
import { isValidObjectId, ObjectId } from "mongoose";

export default {
  async findAll(req: any, res: any) {
    const data = await Customer.find();
    return res.status(200).json({
      status: true,
      message: `success retrieve customers data`,
      data,
    });
  },

  async findById(req: any, res: any) {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: `customer with id : ${id} was not found`,
      });
    }
    const data = await Customer.find({ _id: id });
    if (data.length < 1) {
      return res.status(400).json({
        status: false,
        message: `customer with id : ${id} was not found`,
      });
    }
    return res.status(200).json({
      status: true,
      message: `success retrieve customer data`,
      data,
    });
  },

  async save(req: any, res: any) {
    const { name, email, phone, city } = req.body;
    const exists = await Customer.exists({ email });
    if (exists) {
      return res.status(400).json({
        status: false,
        message: "Email already registered, please use another email",
      });
    }
    const customer = new Customer({
      name,
      email,
      phone,
      city,
    });
    try {
      const data = await customer.save();
      return res.status(200).json({
        status: true,
        message: "success save new data",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: false,
        message: e,
      });
    }
  },

  async deleteById(req: any, res: any) {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: `customer with id : ${id} was not found`,
      });
    }
    const exists = await Customer.exists({ _id: id });
    if (!exists) {
      return res.status(400).json({
        status: false,
        message: `customer with id : ${id} was not found`,
      });
    }
    try {
      await Customer.findOneAndDelete({ _id: id });
      return res.status(200).json({
        status: true,
        message: "success delete from database",
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: e,
      });
    }
  },
};
