export const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
require("dotenv").config();

import { userModel } from "../../models/index";

const localLogin = new LocalStrategy(
  {
    usernameField: "email"
  },
  async (email, password, done) => {
    let user = await userModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, false, { error: "Your details couldn't be verified " });
    }
    user = user.toObject();
    delete user.password;
    done(null, user);
  }
);

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (payload, done) => {
    let user = await userModel.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    user = user.toObject();
    delete user.password;
    done(null, user);
  }
);

passport.use(jwtLogin);
passport.use(localLogin);
