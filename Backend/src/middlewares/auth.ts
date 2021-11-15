import jwt from "jsonwebtoken";
import User from "../models/User";
module.exports.googleOauth = (req: any, res: any) => {
  if (!req.user) {
    return res.status(400).send("Authentication failed!");
  }
  const userInfo = req.user;
  const email = userInfo.email;
  User.findOne({ email: email })
    .then((user) => {
      const token = jwt.sign({ email }, "token secret");
      return res.status(200).send({ token, user });
    })
    .catch((err: any) => {
      console.log("error signing up", err);
      return res.status(401).send({});
    });
};