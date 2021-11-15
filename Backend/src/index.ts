import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
require("./controllers/passport");
const middlewares = require("./middlewares");
const api = require("./routes/user");
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error: string) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
