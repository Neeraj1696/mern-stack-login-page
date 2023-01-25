const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");

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

module.exports = router;
