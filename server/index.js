const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const compress = require("compression");

require("./utils/database/dbconfig");
import { router } from "./routes/index.route";
import { passport } from "./utils/passport/passport";

app.use(compress());
app.use(express.static(path.join(__dirname, "../dist/shopkart/")));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/shopkart/index.html"));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

app.use("/api/", router);

app.listen(3333, () => {
  console.log("server started at 3333");
});
