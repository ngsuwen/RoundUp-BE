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

// function formatDate(dateObject){
//     const parts = {
//         date: dateObject.getDate(),
   
//         month: dateObject.getMonth() + 1,
//         year: dateObject.getFullYear()
//     }
//     //console.log(parts)
//     return `${parts.date}/${parts.month}/${parts.year}`
// }

// const myDate = new Date()
// const myDateFormatted = formatDate(myDate)

// console.log(myDateFormatted)

// const userDate = new Date();
//  userDate.setDate(userDate.getDate()-1);

// console.log(userDate)

//  function dateChange(){
//     const currDate = new Date();
//     return currDate.setDate(currDate.getDate()-1);
// }

// dateChange()

router.post("/expense/seed", async(req,res)=>{

   let seedItems;
   const endDate = new Date();
            for (let i = 0; i < 3; i++){
                

                    try {
                        
                         seedItems = await DataExpense.create({
    
                            username: await User.findOne({username: "user1" }),
                            expensesentry:[
                                {
                                    amount: amount[Math.floor(Math.random() * amount.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    description: description[Math.floor(Math.random() * description.length)],
                                   
                                    date: endDate.setDate(endDate.getDate()-i)
                                    
                                },
                                {
                                    amount: amount[Math.floor(Math.random() * amount.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    description: description[Math.floor(Math.random() * description.length)],
                                    
                                    date: endDate.setDate(endDate.getDate()-i)
                                    
                                },
                                {
                                    amount: amount[Math.floor(Math.random() * amount.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    description: description[Math.floor(Math.random() * description.length)],
                                    
                                    date: endDate.setDate(endDate.getDate()-i)
                                    
                                },
    
                            ]})
                    
                     } catch (err) {
                             res.send(err.message);
    
                }


                
                
        
        }

        res.send(seedItems);
        

      

})


module.exports = router