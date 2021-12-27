// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataExpense = require("../models/data_expenses")


// Routes
// get all expense
router.get("/expense", async(req, res) => {
    let expense
    try{
      expense = await DataExpense.find({})
    }catch(error){
      res.status(500).send({message: 'Unexpected Error'})
      return
    }
    res.send(expense)
  });


// get expense by username objectid
router.get("/expense/user/:usernameid", async (req,res)=>{
    const {usernameid} = req.params
    const expense = await DataExpense.find({username:usernameid})
    res.send(expense)
})


// show route
router.get("/expense/:id", async (req,res)=>{
    const {id} = req.params
    const expense = await DataExpense.findById(id).populate("username")
    res.send(expense)
})




// create route expense
router.post("/expense", async (req, res) => {
    let createdExpense;
    try{
      createdExpense = await DataExpense.create(req.body);
    }catch(err){
      res.status(400).send({message: 'Invalid request body'})
      return
    }
    res.send(createdExpense);
  });


  router.delete("/expense/:id", async(req,res)=>{
      let deletedExpense;
      try{
          deletedExpense = await DataExpense.findByIdAndRemove(req.params.id);
      } catch(err){
          res.status(400).send({message: "Invalid request body"})
          return
      }
      res.send(deletedExpense)
  })



module.exports = router


//checklist:
// 1. router.get("/expense" - done
// 2. router.post("/expense" - done