// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataExpense = require("../models/data_expenses")

const category = ["Shopping", "Food", "Health", "Transportation", "Household"]
const amount = ["100", "200", "300", "400", "500", "600", "700", "800"]
const description = ["A", "B", "C", "D", "E", "F", "G", "H"]

const getRandomCat = Math.floor(Math.random() * category.length)
//console.log(category[getRandomCat])

const getRandomAmt = Math.floor(Math.random() * amount.length)
//console.log(amount[getRandomAmt])

const getRandomDescrip = Math.floor(Math.random() * description.length)
//console.log(description[getRandomDescrip])

router.post("/expense/seed", async(req,res)=>{

    const newExpense = [

        {
            username: await User.findOne({username: "user1" }),
            expensesentry:[
                {
                    amount: amount[Math.floor(Math.random() * amount.length)],
                    category: category[Math.floor(Math.random() * category.length)],
                    description: description[Math.floor(Math.random() * description.length)],
                    
                },
                {
                    amount: amount[Math.floor(Math.random() * amount.length)],
                    category: category[Math.floor(Math.random() * category.length)],
                    description: description[Math.floor(Math.random() * description.length)],
                    
                },
                {
                    amount: amount[Math.floor(Math.random() * amount.length)],
                    category: category[Math.floor(Math.random() * category.length)],
                    description: description[Math.floor(Math.random() * description.length)],
                    
                }
            ]
        }
    
    ];

    
            try {

                const seedItems = await DataExpense.create(newExpense);
                res.send(seedItems);
            } catch (err) {
                res.send(err.message);
            }

        

      

})


module.exports = router