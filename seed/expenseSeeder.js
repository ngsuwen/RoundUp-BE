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


router.post("/expense/seed", async(req,res)=>{

   let seedItems;

   //not needed
    // const newExpense = [

    //     {
    //         username: await User.findOne({username: "user1" }),
    //         expensesentry:[
    //             {
    //                 amount: amount[Math.floor(Math.random() * amount.length)],
    //                 category: category[Math.floor(Math.random() * category.length)],
    //                 description: description[Math.floor(Math.random() * description.length)],
                    
    //             },
    //             {
    //                 amount: amount[Math.floor(Math.random() * amount.length)],
    //                 category: category[Math.floor(Math.random() * category.length)],
    //                 description: description[Math.floor(Math.random() * description.length)],
                    
    //             },
    //             {
    //                 amount: amount[Math.floor(Math.random() * amount.length)],
    //                 category: category[Math.floor(Math.random() * category.length)],
    //                 description: description[Math.floor(Math.random() * description.length)],
                    
    //             }
    //         ]
    //     }
    
    // ];
            
            for (let i = 0; i < 9; i++){

                try {
                
                     seedItems = await DataExpense.create({

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
                                
                            },

                        ]})
                
                 } catch (err) {
                         res.send(err.message);

            }
            
        }

        res.send(seedItems);
        

      

})


module.exports = router