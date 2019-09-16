const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../shopkartUI/dist/shopkart/")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../shopkartUI/dist/shopkart/index.html"));
});

app.listen(3333, () => {
  console.log("server started at 3333");
});
