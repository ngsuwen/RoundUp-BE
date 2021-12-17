const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// schema
const User = require('../models/user');
const Token = require('../models/token');

router.use(express.json());

// to be stored in database
let refreshTokens;
let accessToken;
let refreshToken;

router.post("/login", async(req, res) => {
  const user = req.body.username;
  const password = req.body.password
  const isUserValid = await User.findOne({username: user});
  // authenticate user
  if (isUserValid) {
    const isPasswordValid = await bcrypt.compare(password,isUserValid.password);
    if (isPasswordValid){
      const tokens = await Token.create({accessToken: generateAccessToken(user), refreshToken:generateRefreshToken(user)});
      res.send(tokens);
    } else {
      res.status(400).send("invalid password");
    }
  } else {
    res.status(403).send("invalid user");
  }
});

// use refresh token
router.post("/token", (req, res) => {
  refreshToken = req.body.token;
  if (refreshTokens.includes(refreshToken)) {
    // get new tokens
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      accessToken = generateAccessToken(user.username);
      refreshToken = generateRefreshToken(user.username);
      refreshTokens = refreshToken;
      res.send({ accessToken, refreshToken });
    });
  } else {
    // expired
    res.status(403).send("Forbidden");
  }
});

function generateAccessToken(user) {
  return jwt.sign({username: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
}

function generateRefreshToken(user) {
  return jwt.sign({username: user}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15s'});
}

module.exports=router;