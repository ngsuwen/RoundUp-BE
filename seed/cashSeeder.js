// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataCash = require("../models/data_cash")
const DataExpense = require("../models/data_expenses")

// router.post("/cash/seed", async(req,res)=>{

//     const newCash = [

//         {
//             // username: "61bd9a6c2fcd3b08f3365f75",
//             // date: Date.now,
//             amount: 10,
//             category: "income",
//             description: "red",
//         }
    
//     ];

//         try {
//         const seedItems = await DataCash.create(newCash);
//         res.send(seedItems);
//     } catch (err) {
//         res.send(err.message);
//     }

// })


module.exports = router