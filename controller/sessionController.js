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
      // hide user
      const hash = await bcrypt.hash(user, 10);
      // generate tokens
      const accessToken = generateAccessToken(hash);
      const refreshToken = generateRefreshToken(hash);
      // store refreshtoken in db
      await Token.create({
        username: await User.findOne({ username: user }),
        refreshToken: refreshToken,
      });
      res.send({ accessToken: accessToken, refreshToken: refreshToken });
      // error handling
    } else {
      res.status(401).send({ error: "invalid password" });
    }
  } else {
    res.status(401).send({ error: "invalid user" });
  }
});

// check tokens
router.post("/token", async (req, res) => {
  const accessToken = req.body.accessToken;
  const refreshToken = req.body.refreshToken;
  // check if accessToken is valid
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        // expired, check refresh token
        // assuming there will be a refresh token
        // check token with database
        const isTokenValid = await Token.findOne({
          refreshToken: refreshToken,
        });
        if (isTokenValid) {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, user) => {
              if (err) {
                // refresh token expired
                // delete token from db
                await Token.findOneAndDelete({refreshToken: refreshToken})
                res.status(401).send({ error: "token expired"});
              } else {
                // generate new tokens
                const newAccessToken = generateAccessToken(user.username);
                const newRefreshToken = generateRefreshToken(user.username);
                // store refreshtoken in db
                await Token.findOneAndUpdate({
                  refreshToken: refreshToken
                },{
                  refreshToken: newRefreshToken,
                });
                res.send({
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken,
                });
              }
            }
          );
        } else {
          res.status(401).send({ error: "invalid token"});
        }
      } else {
        res.status(200).send({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    }
  );
});

function generateAccessToken(user) {
  return jwt.sign({ username: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ username: user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30s",
  });
}

module.exports = router;
