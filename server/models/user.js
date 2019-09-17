const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    username: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const userModel = mongoose.model("User", UserSchema, "users");
// module.exports = mongoose.model("User", UserSchema, "users");
