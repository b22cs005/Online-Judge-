const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const compilerRoute = require("./Routes/CompilerRoute");
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const cookieParser = require("cookie-parser");


const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB is connected successfully");


    app.use(
      cors({
        origin: ["https://www.codehack.me", "https://codehack.me","https://online-judge-c3r5.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Routes
    app.use("/", compilerRoute);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

// Start the server
startServer();
