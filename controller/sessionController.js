const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(express.json());

// to be stored in database
let refreshTokens;
let accessToken;
let refreshToken;

// dummy accounts, to be stored in database
const accounts = [
  {
    username: "user1",
    password: "password1",
  },
  {
    username: "user2",
    password: "password2",
  },
];

router.post("/login", (req, res) => {
  const user = req.body.username;
  const check = accounts.findIndex((account) => account.username === user);
  // Authenticate User
  if (check !== -1) {
    accessToken = generateAccessToken(user);
    refreshToken = generateRefreshToken(user);
    // To be stored in database
    refreshTokens = refreshToken;
    res.send({ accessToken, refreshToken });
  } else {
    res.status(403).send("Forbidden");
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