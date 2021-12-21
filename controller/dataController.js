// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataCash = require("../models/data_cash")


// Seeding data

// router.post("/cash/seed", async (req,res)=>{
//     const user = "61bd9a6c2fcd3b08f3365f75"
//     const cashInput =[
//         {
//             username : user,
//             cashentry: [
//                 {
                   
//                     amount: 1700,
//                     category: "Income",
//                     description: "Monthly"

//                 }
//             ]
//         }
//     ]

//     // let newCash = new DataCash(cashInput);
//     // newCash.save((err, cash) =>{
//     //     if(err){
//     //         res.status(400).send(err)
//     //     } else{
//     //         res.status(200).json(cash)
//     //     }
//     // })

//     /////////
//     try{
//         const seedItems =  await DataCash.create(cashInput)
//         res.send(seedItems)
//     } catch (err){
//         res.send(err.message)
//     }
//     /////////
// })



router.post("/cash/seed", async (req,res)=>{


let cash = new DataCash({

    username: "user1",
    cashentry:[
        {
            date: Date.now,
            amount: 1000,
            category: "income",
            description: "bonus"
        },
        {
            date: Date.now,
            amount: 100,
            category: "savings",
            description: "blue"
        },
        {
            date: Date.now,
            amount: 5,
            category: "gift",
            description: "green"
        }
    ]


})

try{
    const seedItems =  await DataCash.create(cash)
    res.send(seedItems)
        } catch (err){
            res.send(err.message)
        }


})




// Routes
// get all cash
router.get("/cash", async (req,res)=>{
    const cash = await DataCash.find({})
    res.send(cash)
})

// show route
router.get("/cash/:id", async (req,res)=>{
    const {id} = req.params
    const cash = await DataCash.findById(id).populate("username")
    res.send(cash)
})

// create route
router.post("/cash", async (req,res)=>{
    const cash = await DataCash.create(req.body)
    res.send(cash)
})



module.exports = router