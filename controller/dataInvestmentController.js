// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config();

// Schema
const User = require("../models/user");
const DataInvestment = require("../models/data_investments");

// Routes
// get all investment
router.get("/user/:usernameid/", async (req, res) => {
  const usernameid = req.params.usernameid
  let investment;
  try {
    investment = await DataInvestment.find({username:usernameid});
  } catch (error) {
    res.status(500).send({ message: "Unexpected Error" });
    return;
  }
  res.send(investment);
});

// get expense by username and monthly data
// router.get("/expense/user/:usernameid/:monthOfExpense", async (req,res)=>{
//     const usernameid = req.params.usernameid
//     const monthOfExpense = req.params.monthOfExpense
//     const expense = await DataExpense.find({username:usernameid, 'expensesentry.date':{'$gte': new Date(`${monthOfExpense}-01`), '$lte': new Date(`${monthOfExpense}-31`)}})
//     res.send(expense)
// })

// show route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const investment = await DataInvestment.findById(id).populate("username");
  res.send(investment);
});

// const for crypto api
const CRYPTO_URL=process.env.CRYPTO_URL;

// show crypto current value
router.get("/crypto/:ticker/current", async (req, res) => {
  const { ticker } = req.params;
  const listResponse = await fetch(`https://${CRYPTO_URL}/coins/list`)
  const list = await listResponse.json()
  const coin = list.filter(element=>element.symbol===ticker)
  const id = coin[0].id
  const response = await fetch(`https://${CRYPTO_URL}/coins/${id}`)
  const data = await response.json()
  const currentValue = data.market_data.current_price.sgd.toString()
  res.send(currentValue)
});

// show stocks certain date (DD-MM-YYYY)
router.get("/crypto/:ticker/:date", async (req, res) => {
  const { ticker, date } = req.params;
  const listResponse = await fetch(`https://${CRYPTO_URL}/coins/list`)
  const list = await listResponse.json()
  const coin = list.filter(element=>element.symbol===ticker)
  const id = coin[0].id
  const response = await fetch(`https://${CRYPTO_URL}/coins/${id}/history?date=${date}`)
  const data = await response.json()
  const currentValue = data.market_data.current_price.sgd.toString()
  res.send(currentValue)
});

// const for stocks api
const STOCKS_URL=process.env.STOCKS_URL;
const STOCKS_KEY=process.env.STOCKS_KEY;

// show stocks current value
router.get("/stocks/:ticker/current", async (req, res) => {
  const { ticker } = req.params;
  const response = await fetch(`https://${STOCKS_URL}/quote?symbol=${ticker.toUpperCase()}&token=${STOCKS_KEY}`)
  const data = await response.json()
  const currentValue = data.c.toString()
  res.send(currentValue)
});

// show stocks certain date (YYYY-MM-DD)
router.get("/stocks/:ticker/:date", async (req, res) => {
  const { ticker, date } = req.params;
  const dateFormat = date.replace(/-/g, '/')
  const unixTime = await fetch(`https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=${dateFormat}`)
  const unixTimeData = await unixTime.json()
  const response = await fetch(`https://${STOCKS_URL}/stock/candle?symbol=${ticker.toUpperCase()}&resolution=D&from=${unixTimeData.UnixTimeStamp}&to=${unixTimeData.UnixTimeStamp}&token=${STOCKS_KEY}`)
  const data = await response.json()
  const value = data.c[0].toString()
  res.send(value)
});

// create route investment
router.post("/", async (req, res) => {
  let createdInvestment;
  try {
    createdInvestment = await DataInvestment.create(req.body);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(createdInvestment);
});

router.delete("/:id", async (req, res) => {
  let deletedInvestment;
  try {
    deletedInvestment = await DataInvestment.findByIdAndRemove(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(deletedInvestment);
});

router.get("/:id/edit", async (req, res) => {
  let editedInvestment;
  try {
    editedInvestment = await DataInvestment.findById(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
  }
  res.send(editedInvestment);
});

router.put("/:id/edit", async (req, res) => {
  let editedInvestment;
  try {
    editedInvestment = await DataInvestment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
  }
  res.send(editedInvestment);
});

module.exports = router;
