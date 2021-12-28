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
  const hash = await bcrypt.hash(password, 10);
  const role = req.body.role;
  // check if passwords match
  if (password !== passwordCheck) {
    res.send({ error: "incorrect password" });
    return
  }
  try {
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
  const { id } = req.params;
  const findUser = await User.findById(id)
  // returns object with username, password and role
  res.send(findUser)
});

// delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const findUser = await User.findByIdAndRemove(id)
  // returns object with username, password and role
  res.send(findUser)
});

// update user info
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userFound = await User.findById(id);
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword
  const role = req.body.role;
  const isPasswordValid = await bcrypt.compare(
    oldPassword,
    userFound.password
  )
  if (!isPasswordValid) {
    res.send({ error: "incorrect password" });
    return
  }
  const updateUser = await User.findByIdAndUpdate(id, {
    password: await bcrypt.hash(newPassword, 10),
    role: role
  }, {new: true})
  res.send(updateUser)
});

module.exports = router;
