const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// schema
const User = require("../models/user");
const Token = require("../models/token");

// signup -> create new user
router.post("/signup", async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  const passwordCheck = req.body.passwordCheck;
  // check if passwords match
  if (password !== passwordCheck) {
    res.send({ error: "incorrect password" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const role = req.body.role;
    const userCreate = await User.create({
      username: user,
      password: hash,
      role: role,
    });
    res.send(userCreate);
  } catch (err) {
    // username needs to be unique, if not will give error
    res.send({ error: err.message });
  }
});

// get userinfo
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const findToken = await Token.findOne({refreshToken: id})
  const findUser = await User.findById(findToken.username)
  // returns object with username, password and role
  res.send(findUser)
});

router.post("/forloop", async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  const passwordCheck = req.body.passwordCheck;
  // check if passwords match
  if (password !== passwordCheck) {
    res.send({ error: "incorrect password" });
  }
  for (let i = 0; i < 3; i++) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const role = req.body.role;
      const userCreate = await User.create({
        username: user + i,
        password: hash,
        role: role,
      });
      // res.send(userCreate);
    } catch (err) {
      res.send({ error: err.message });
    }
  }
  res.send("forloop pass");
});

module.exports = router;
