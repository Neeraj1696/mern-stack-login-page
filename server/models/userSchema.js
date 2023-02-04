const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "hfhethreheresasftewqasfteasdfter";

mongoose;
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
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }

  next();
});

// token generater

userSchema.methods.generateAuthtoken = async function () {
  try {
    let token12 = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token12 });
    await this.save();
    return token12;
  } catch (error) {
    resizeBy.status(422).json(error);
  }
};

// create model

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
