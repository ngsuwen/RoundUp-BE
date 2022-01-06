// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

// Schema
const User = require("../models/user")
const DataInvestment = require("../models/data_investments")

//const category = ["Crypto", "US stocks"]
const category = ["Crypto"]
const price = ["100", "200", "300", "400", "500", "600", "700", "800"]
// const ticker = ["TSLA", "AAPL", "AMZN", "MSFT", "GOOGL", "FB", "NVDA", "V"]
const ticker = ["ETH", "BTC"]
const quantity = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
const transaction = ["Buy", "Sell"]


router.post("/investment/seed", async(req,res)=>{

   let seedItems;
   const endDate = new Date();
   // i.e, loop 3 times will generate 3 days data
            for (let i = 0; i < 1; i++){
                
                    //////////////the 1 means day. i.e, if wants to minus 3 days, change to 3
                    try {
                         const currDate = endDate.setDate(endDate.getDate()-5) // minusing once per loop
                         seedItems = await DataInvestment.create({
    
                            username: await User.findOne({username: "user1" }),
                            priceHistory: [],
                            investmentsentry:
                                {
                                    price: price[Math.floor(Math.random() * price.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    ticker: ticker[Math.floor(Math.random() * ticker.length)],
                                    quantity: quantity[Math.floor(Math.random() * quantity.length)],
                                    date: currDate,
                                    transaction: transaction[Math.floor(Math.random() * transaction.length)],
                                    
                                }
  
    
                         })
                    
                     } catch (err) {
                             res.send(err.message);
    
                }
   
        
        }

        res.send(seedItems);
  

})

module.exports = router