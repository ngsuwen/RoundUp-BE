// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataInvestment = require("../models/data_investments")

const category = ["Crypto", "US stocks"]
const amount = ["100", "200", "300", "400", "500", "600", "700", "800"]
const ticker = ["TSLA", "AAPL", "AMZN", "MSFT", "GOOGL", "FB", "NVDA", "V"]
const quantity = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]



router.post("/investment/seed", async(req,res)=>{

   let seedItems;
   const endDate = new Date();
   // i.e, loop 3 times will generate 3 days data
            for (let i = 0; i < 1; i++){
                
                    //////////////the 1 means day. i.e, if wants to minus 3 days, change to 3
                    try {
                         const currDate = endDate.setDate(endDate.getDate()-1) // minusing once per loop
                         seedItems = await DataInvestment.create({
    
                            username: await User.findOne({username: "user1" }),
                            investmentsentry:
                                {
                                    amount: amount[Math.floor(Math.random() * amount.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    ticker: ticker[Math.floor(Math.random() * ticker.length)],
                                    quantity: quantity[Math.floor(Math.random() * quantity.length)],
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