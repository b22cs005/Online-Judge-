const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const authRoute = require("./Routes/AuthRoute");
const problemRoute = require("./Routes/ProblemRoute");
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const cookieParser = require("cookie-parser");
const session = require("\express-session");
const passport = require("passport");
require("./config/passport");

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB is connected successfully");


    app.use(
      cors({
        origin: ["https://www.codehack.me", "https://codehack.me", "https://online-judge-c3r5.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
       // allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
  

    /* app.options("*", cors({
      origin: ["https://www.codehack.me", "https://codehack.me"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }));*/

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
      session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());


    app.use("/", authRoute);
    app.use("/", problemRoute);

   
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
