import passport from "passport";
import { Error } from "mongoose";
import { UserInterface } from "../interfaces/UserInterface";
import User from "../models/User";
const GoogleTokenStrategy = require('passport-google-token').Strategy;
passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: any
    ) => {
      try {
      const defaultUser = {
        fullName: `${profile.name.givenName}   ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile._json.picture,
        googleId: profile.id
      }
      let user: UserInterface;
      User.findOne({ email: defaultUser.email })
        .then((userInBase) => {
          if (!userInBase) {
            let user = defaultUser
            User.create(defaultUser);
            console.log("user created");
            return cb(null, user)
          } else {
            console.log("User already exists");
            let user = userInBase;
            console.log(user.email);
            return cb(null, user)
          }
        })
       .catch((err) => {
         console.log("error signing up", err);
         return cb(err, user);
       });
      } catch (e: any) {
        throw new Error(e);
      }
     }
    )
  );
passport.serializeUser((user: any, cb) => {
  cb(null, user.id);
});
passport.deserializeUser(async (id: any, cb) => {
  const user = await User.findById(id).catch((err) => {
  console.log("error deserializing", err);
  cb(err, null)
  });
  if (user) cb(null, user);
});