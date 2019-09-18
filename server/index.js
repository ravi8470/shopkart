const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("./utils/database/dbconfig");

app.use(cors());
app.use(express.static(path.join(__dirname, "../dist/shopkart/")));

app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/shopkart/index.html"));
});
app.listen(3333, () => {
  console.log("server started at 3333");
});
