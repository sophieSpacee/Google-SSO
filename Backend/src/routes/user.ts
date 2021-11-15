import express  from "express";
import passport from "passport";
const { googleOauth } = require("../middlewares/auth");
const app = express();
app.post('/auth/google',
passport.authenticate('google-token', { session: false }),
googleOauth
);
module.exports = app;