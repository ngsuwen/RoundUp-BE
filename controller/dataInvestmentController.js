// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataInvestment = require("../models/data_investments")


// Routes
// get all investment
router.get("/investment", async(req, res) => {
    let investment
    try{
      investment = await DataInvestment.find({})
    }catch(error){
      res.status(500).send({message: 'Unexpected Error'})
      return
    }
    res.send(investment)
  });


// get expense by username and monthly data 
// router.get("/expense/user/:usernameid/:monthOfExpense", async (req,res)=>{
//     const usernameid = req.params.usernameid
//     const monthOfExpense = req.params.monthOfExpense
//     const expense = await DataExpense.find({username:usernameid, 'expensesentry.date':{'$gte': new Date(`${monthOfExpense}-01`), '$lte': new Date(`${monthOfExpense}-31`)}})
//     res.send(expense)
// })


// show route
router.get("/investment/:id", async (req,res)=>{
    const {id} = req.params
    const investment = await DataInvestment.findById(id).populate("username")
    res.send(investment)
})




// create route investment
router.post("/investment", async (req, res) => {
    let createdInvestment;
    try{
      createdInvestment = await DataInvestment.create(req.body);
    }catch(err){
      res.status(400).send({message: 'Invalid request body'})
      return
    }
    res.send(createdInvestment);
  });


  router.delete("/investment/:id", async(req,res)=>{
      let deletedInvestment;
      try{
          deletedInvestment = await DataInvestment.findByIdAndRemove(req.params.id);
      } catch(err){
          res.status(400).send({message: "Invalid request body"})
          return
      }
      res.send(deletedInvestment)
  })


  router.get("/investment/:id/edit", async(req,res)=>{
    let editedInvestment;
    try{
        editedInvestment = await DataInvestment.findById(req.params.id)
    } catch(err){
        res.status(400).send({message: "Invalid request body"})
    }
    res.send(editedInvestment)
})


  router.put("/investment/:id/edit", async(req,res)=>{
      let editedInvestment;
      try{
          editedInvestment = await DataInvestment.findByIdAndUpdate(req.params.id, req.body, {new:true} )
      } catch(err){
          res.status(400).send({message: "Invalid request body"})
      }
      res.send(editedInvestment)
  })




module.exports = router


