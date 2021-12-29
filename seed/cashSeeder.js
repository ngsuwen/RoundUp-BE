// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataCash = require("../models/data_cash")

const category = ["Income", "Savings", "Petty cash", "Bonus", "Allowance"]
const amount = ["100", "200", "300", "400", "500", "600", "700", "800"]
const description = ["A", "B", "C", "D", "E", "F", "G", "H"]



router.post("/cash/seed", async(req,res)=>{

   let seedItems;
   const endDate = new Date();
   // i.e, loop 3 times will generate 3 days data
            for (let i = 0; i < 1; i++){
                
                    //////////////the 1 means day. i.e, if wants to minus 3 days, change to 3
                    try {
                         const currDate = endDate.setDate(endDate.getDate()-1) // minusing once per loop
                         seedItems = await DataCash.create({
    
                            username: await User.findOne({username: "user2" }),
                            cashentry:
                                {
                                    amount: amount[Math.floor(Math.random() * amount.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    description: description[Math.floor(Math.random() * description.length)],
                                    date: currDate
                                    
                                }
  
    
                         })
                    
                     } catch (err) {
                             res.send(err.message);
    
                }
   
        
        }

        res.send(seedItems);
  

})

module.exports = router