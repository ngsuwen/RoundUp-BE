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
router.get("/investment", async (req, res) => {
  let investment;
  try {
    investment = await DataInvestment.find({});
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
router.get("/investment/:id", async (req, res) => {
  const { id } = req.params;
  const investment = await DataInvestment.findById(id).populate("username");
  res.send(investment);
});

// const for stocks api
const STOCKS_URL=process.env.STOCKS_URL;
const STOCKS_KEY=process.env.STOCKS_KEY;

// show crypto current value
// show crypto certain date

// show stocks current value
router.get("/investment/stocks/:ticker/current", async (req, res) => {
  const { ticker } = req.params;
  const response = await fetch(`https://${STOCKS_URL}/quote?symbol=${ticker}&token=${STOCKS_KEY}`)
  const data = await response.json()
  const currentValue = data.c.toString()
  res.send(currentValue)
});

// show stocks certain date (YYYY-MM-DD)
router.get("/investment/stocks/:ticker/:date", async (req, res) => {
  const { ticker, date } = req.params;
  const dateFormat = date.replace(/-/g, '/')
  const unixTime = await fetch(`https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=${dateFormat}`)
  const unixTimeData = await unixTime.json()
  const addUnixTime = Number(unixTimeData.UnixTimeStamp)+86400
  const response = await fetch(`https://${STOCKS_URL}/stock/candle?symbol=${ticker}&resolution=D&from=${addUnixTime}&to=${addUnixTime}&token=${STOCKS_KEY}`)
  const data = await response.json()
  const value = data.c[0].toString()
  res.send(value)
});

// create route investment
router.post("/investment", async (req, res) => {
  let createdInvestment;
  try {
    createdInvestment = await DataInvestment.create(req.body);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(createdInvestment);
});

router.delete("/investment/:id", async (req, res) => {
  let deletedInvestment;
  try {
    deletedInvestment = await DataInvestment.findByIdAndRemove(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(deletedInvestment);
});

router.get("/investment/:id/edit", async (req, res) => {
  let editedInvestment;
  try {
    editedInvestment = await DataInvestment.findById(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
  }
  res.send(editedInvestment);
});

router.put("/investment/:id/edit", async (req, res) => {
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
