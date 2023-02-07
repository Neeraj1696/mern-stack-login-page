const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// for user registration

router.post("/register", async (req, res) => {
  // console.log(req.body);

  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ message: "fill all the details" });
  }
  try {
    const preuser = await userdb.findOne({ email: email, password: password });

    if (preuser) {
      res.status(422).json({ message: "This email is already registered" });
    } else if (password !== cpassword) {
      res.status(422).json({ message: "This password does not match" });
    } else {
      const finalUser = new userdb({
        fname,
        email,
        password,
        cpassword,
      });

      // here password hashing

      const storeData = await finalUser.save();
      // console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// user login

router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }
  try {
    const userValid = await userdb.findOne({
      email: email,
    });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(422).json({ error: "Invalid password Details" });
      } else {
        const token = await userValid.generateAuthtoken();
        console.log(token);

        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    // console.log(error);
    console.log("catch Block");
  }
});

// user validation and authorization check

router.get("/validuser", authenticate, async (req, res) => {
  // console.log("Done authenticate");
  try {
    const ValidUserOne = await userdb.findOne({ _id: req.userId });

    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });
    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json(req.rootUser.tokens);
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});

module.exports = router;
