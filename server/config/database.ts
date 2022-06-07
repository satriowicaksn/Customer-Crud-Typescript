import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("reconnected", () => {
  console.log("reconnected to mongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected from mongoDB");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB Connection Closed");
});

mongoose.connection.on("error", (error: any) => {
  console.log("MongoDB ERROR: " + error);

  process.exit(1);
});

const connectDatabase: any = async () => {
  const url: any = process.env.MONGO || "mongodb://mongo:27017/basic_crud";
  const callback: any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  await mongoose.connect(url, callback);
};

export default connectDatabase;
