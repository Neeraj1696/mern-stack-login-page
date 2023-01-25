const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fname: {
    type: "string",
    required: true,
    trim: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: "string",
    required: true,
    minLength: 6,
  },
  cpassword: {
    type: "string",
    required: true,
    minLength: 6,
  },
  tokens: [
    {
      token: {
        type: "string",
        required: true,
      },
    },
  ],
});

// password hasing

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.cpassword = await bcrypt.hash(this.cpassword, 12);

  next();
});

// create model

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
