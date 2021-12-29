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


// get expense by username and monthly data 
router.get("/expense/user/:usernameid/:monthOfExpense", async (req,res)=>{
    const usernameid = req.params.usernameid
    const monthOfExpense = req.params.monthOfExpense
    const expense = await DataExpense.find({username:usernameid, 'expensesentry.date':{'$gte': new Date(`${monthOfExpense}-01`), '$lte': new Date(`${monthOfExpense}-31`)}})
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


  router.get("/expense/:id/edit", async(req,res)=>{
    let editedExpense;
    try{
        editedExpense = await DataExpense.findById(req.params.id)
    } catch(err){
        res.status(400).send({message: "Invalid request body"})
    }
    res.send(editedExpense)
})


  router.put("/expense/:id/edit", async(req,res)=>{
      let editedExpense;
      try{
          editedExpense = await DataExpense.findByIdAndUpdate(req.params.id, req.body, {new:true} )
      } catch(err){
          res.status(400).send({message: "Invalid request body"})
      }
      res.send(editedExpense)
  })




module.exports = router


//checklist:
// 1. router.get("/expense" - done
// 2. router.post("/expense" - done