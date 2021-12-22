const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// schema
const User = require("../models/user");

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
    res.send({ error: err.message });
  }
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
        username: user+i,
        password: hash,
        role: role,
      });
      // res.send(userCreate);
    } catch (err) {
      res.send({ error: err.message });
    }
  }
  res.send('forloop pass')
});

module.exports = router;
