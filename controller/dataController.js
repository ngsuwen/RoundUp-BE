// Dependencies
const express = require("express")
const router = express.Router()

// Schema
const DataCash = require("../models/data_cash")

// Seeding data

router.post("/cash/seed", async (req,res)=>{
    const cashInput =[
        {
          
            cashentry: [
                {
                    amount: 1700,
                    category: "income",
                    description: "bonus"

                }
            ]
        }
    ]

    try{
        const seedItems =  await DataCash.create(cashInput)
        res.send(seedItems)
    } catch (err){
        res.send(err.message)
    }

})



// Routes
// get all cash
router.get("/cash", async (req,res)=>{
    const cash = await DataCash.find()
    res.send(cash)
})

// show route
router.get("/cash/:id", async (req,res)=>{
    const {id} = req.params
    const cash = await DataCash.findById(id)
    res.send(cash)
})

// create route
router.post("/cash", async (req,res)=>{
    const cash = await DataCash.create(req.body)
    res.send(cash)
})



module.exports = router