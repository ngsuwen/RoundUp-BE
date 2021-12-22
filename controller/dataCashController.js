// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataCash = require("../models/data_cash")


// Seeding data

router.post("/cash/seed", async(req,res)=>{

    const newCash = [

        {
            username: await User.findOne({username: "user1" }),
            cashentry:[
                {
                    amount: 5000,
                    category: "test",
                    description: "testing",
                    
                }
            ]
        }
    
    ];


        try {
        const seedItems = await DataCash.create(newCash);
        res.send(seedItems);
    } catch (err) {
        res.send(err.message);
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