// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Schema
const User = require("../models/user");
const DataCash = require("../models/data_cash");

// Routes
// get all cash
router.get("/", async (req, res) => {
  let cash;
  try {
    cash = await DataCash.find({});
  } catch (error) {
    res.status(500).send({ message: "Unexpected Error" });
    return;
  }
  res.send(cash);
});

// get cash by username and monthly data
router.get("/user/:usernameid/:monthOfCash", async (req, res) => {
  const usernameid = req.params.usernameid;
  const monthOfCash = req.params.monthOfCash;
  const monthOfCashDateObj = new Date(monthOfCash);
  // previous month's last day 2359
  const firstday = new Date(
    monthOfCashDateObj.getFullYear(),
    monthOfCashDateObj.getMonth(),
    1
  );
  // current month's last day 2359
  const lastday = new Date(
    monthOfCashDateObj.getFullYear(),
    monthOfCashDateObj.getMonth() + 1,
    1
  );
  const cash = await DataCash.find({
    username: usernameid,
    "cashentry.date": { $gt: firstday, $lte: lastday },
  });
  res.send(cash);
});

// get cash by username and yearly data
// YYYY-MM
router.get("/user/:usernameid/yearly/:monthOfCash", async (req, res) => {
  const usernameid = req.params.usernameid;
  const monthOfCash = req.params.monthOfCash;
  const monthOfCashDateObj = new Date(monthOfCash);
  let cashArr=[]
  for  (let i = 1; i<=12; i++){
    let monthlyCash = 0
    let firstday = new Date(
      monthOfCashDateObj.getFullYear() - 1,
      monthOfCashDateObj.getMonth() + i,
      1
    );
    let lastday = new Date(
      monthOfCashDateObj.getFullYear() - 1,
      monthOfCashDateObj.getMonth() + i+1,
      1
    );
    const cash = await DataCash.find({
      username: usernameid,
      "cashentry.date": { $gt: firstday, $lte: lastday },
    });
    cash.forEach((data)=>monthlyCash+=data.cashentry.amount)
    cashArr.push(monthlyCash.toFixed(2))
  }
  res.send(cashArr);
});

// show route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cash = await DataCash.findById(id).populate("username");
  res.send(cash);
});

// create route cash
router.post("/", async (req, res) => {
  let createdCash;
  try {
    createdCash = await DataCash.create(req.body);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(createdCash);
});

router.delete("/:id", async (req, res) => {
  let deletedCash;
  try {
    deletedCash = await DataCash.findByIdAndRemove(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(deletedCash);
});

router.get("/:id/edit", async (req, res) => {
  let editedCash;
  try {
    editedCash = await DataCash.findById(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
  }
  res.send(editedCash);
});

router.put("/:id/edit", async (req, res) => {
  let editedCash;
  try {
    editedCash = await DataCash.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
  }
  res.send(editedCash);
});

module.exports = router;
