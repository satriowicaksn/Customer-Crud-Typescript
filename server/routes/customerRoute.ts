import express from "express";
import customerController from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/", customerController.findAll);
customerRouter.get("/customer", customerController.findAll);
customerRouter.get("/customer/:id", customerController.findById);
customerRouter.post("/customer", customerController.save);
customerRouter.delete("/customer/:id", customerController.deleteById);

export default customerRouter;
