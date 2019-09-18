export const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

import { userModel } from "../models/index";
import { generateToken } from "../service/auth.service";

router.post("/signup", signup);
router.post("/isemailunique", isEmailUnique);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.get("/check", (req, res) => {
  // res.send({ a: "abc" });
  res.send("abc");
});

async function signup(req, res) {
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.password, 5);
  console.log(hash);
  let newUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });
  newUser.save((err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
}

function isEmailUnique(req, res) {
  console.log(req.body.email);
  userModel.findOne({ email: req.body.email }, (err, doc) => {
    if (err) throw err;
    console.log(doc);
    let result = doc ? false : true;
    res.send({ result });
  });
}

function login(req, res) {
  res.json({ user: req.user, token: generateToken(req.user) });
}
