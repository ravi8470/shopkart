const mongoose = require("mongoose");
require("dotenv").config();

export const connectDB = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASS}@ravi-mongo-cluster-v9xqc.mongodb.net/shopkart?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
};
