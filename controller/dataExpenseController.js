// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataExpense = require("../models/data_expenses")


// Seeding data

// router.post("/expense/seed", async(req,res)=>{

//     const newExpense = [

//         {
//             username: await User.findOne({username: "user1" }),
//             expensesentry:[
//                 {
//                     amount: 100,
//                     category: "shopping",
//                     description: "new bag",
                    
//                 }
//             ]
//         }
    
//     ];


//         try {
//         const seedItems = await DataExpense.create(newExpense);
//         res.send(seedItems);
//     } catch (err) {
//         res.send(err.message);
//     }

// })



// Routes
// get all expense
router.get("/expense", async (req,res)=>{
    const expense = await DataExpense.find({})
    res.send(expense)
})

// get expense by username objectid
router.get("/expense/:usernameid", async (req,res)=>{
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

// create route
router.post("/expense", async (req,res)=>{
    const expense = await DataExpense.create(req.body)
    res.send(expense)
})



module.exports = router