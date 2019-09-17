const mongoose = require("mongoose");
const debug = require("debug")("express-mongoose-es6-rest-api:index");
require("dotenv").config();

export const connectDB = () => {
  mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASS}@ravi-mongo-cluster-v9xqc.mongodb.net/shopkart?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
};
