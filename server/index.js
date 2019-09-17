const express = require("express");
const path = require("path");
const app = express();
import { userModel } from "./models/user.js";
import { connectDB } from "./utils/database/dbconfig";

connectDB();

app.use(express.static(path.join(__dirname, "../dist/shopkart/")));

app.get("*", (req, res) => {
  console.log("dslkfj");
  userModel.insertMany(
    [{ username: "Ravi", password: "Kumar" }],
    (err, docu) => {
      console.log("here");
      if (err) throw err;
      console.log(docu);
      res.sendFile(path.join(__dirname, "../dist/shopkart/index.html"));
    }
  );
});
app.listen(3333, () => {
  console.log("server started at 3333");
});
