const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// schema
const User = require("../models/user");
const Token = require("../models/token");

router.use(express.json());

router.post("/login", async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  const isUserValid = await User.findOne({ username: user });
  // authenticate user
  if (isUserValid) {
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserValid.password
    );
    if (isPasswordValid) {
      const tokens = await Token.create({
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      });
      res.send(tokens);
    } else {
      res.status(400).send("invalid password");
    }
  } else {
    res.status(400).send("invalid user");
  }
});

// use refresh token
router.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  // check token with database
  const isTokenValid = await Token.findOne({ refreshToken: refreshToken });
  if (isTokenValid) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          // expired
          res.status(498).send("token expired");
        } else {
          // replace tokens
          const tokens = await Token.findOneAndUpdate(
            { refreshToken: refreshToken },
            {
              accessToken: generateAccessToken(user.username),
              refreshToken: generateRefreshToken(user.username),
            },
            { new: true }
          );
          res.send(tokens);
        }
      }
    );
  } else {
    res.status(400).send("invalid token");
  }
});

function generateAccessToken(user) {
  return jwt.sign({ username: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ username: user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10s",
  });
}

module.exports = router;
