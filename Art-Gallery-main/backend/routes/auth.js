const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const requireLogin = require("../middlewares/requireLogin");

router.get("/", (req, res) => {
  res.send("Developer");
});

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;
  // const name = req.body.name;
  // const userName = req.body.userName;

  if (!name || !userName || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields!" });
  }

  //user authentication (check empty fields, existing user )
  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (savedUser) => {
      console.log(savedUser);
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "Username or Email already exists!" });
      }

      //password hashing
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new USER({
          name,
          email,
          userName,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "Registered Successfully!" });
          })
          .catch((err) => console.log(err));
      });
    }
  );
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.status(422).json({ error: "Please enter email and password!" });
  }

  USER.findOne({ email: email }).then((savedUser) => {
    console.log(savedUser);
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email!" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({ message: "Signed in Successfully" });
          const token = jwt.sign({ _id: savedUser.id }, process.env.JWT_KEY);
          res.json(token);
          console.log(token);
        } else {
          return res.status(422).json({ error: "Invalid Password!" });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
