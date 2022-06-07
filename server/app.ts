import express from "express";
import debugLib from "debug";
import logger from "morgan";
import cors from "cors";
import http from "http";
import * as dotenv from "dotenv";
import connectDatabase from "./config/database";
import customerRouter from "./routes/customerRoute";

dotenv.config();
var debug = debugLib("myapp:server");
const env = process.env.NODE_ENV || "development";
var port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customerRouter);

const onListening = () => {
  var addr: any = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log(`starting ${env} application on port ${port}`);
  connectDatabase();
};

const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

export default app;
