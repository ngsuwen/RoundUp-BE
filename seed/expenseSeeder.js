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
//unused
// const date = ["2021-12-22T10:55:02.341+00:00", "2021-12-21T10:55:02.341+00:00","2021-12-20T10:55:02.341+00:00",
//               "2021-12-19T10:55:02.341+00:00", "2021-12-18T10:55:02.341+00:00","2021-12-17T10:55:02.341+00:00",
//               "2021-12-16T10:55:02.341+00:00", "2021-12-15T10:55:02.341+00:00","2021-12-14T10:55:02.341+00:00",
            
//               "2021-12-13T10:55:02.341+00:00", "2021-12-12T10:55:02.341+00:00","2021-12-11T10:55:02.341+00:00",
//               "2021-12-10T10:55:02.341+00:00", "2021-12-09T10:55:02.341+00:00","2021-12-08T10:55:02.341+00:00",
//               "2021-12-07T10:55:02.341+00:00", "2021-12-06T10:55:02.341+00:00","2021-12-05T10:55:02.341+00:00",
            
//               "2021-12-04T10:55:02.341+00:00", "2021-12-03T10:55:02.341+00:00","2021-12-02T10:55:02.341+00:00",
//               "2021-12-01T10:55:02.341+00:00", "2021-11-31T10:55:02.341+00:00","2021-11-30T10:55:02.341+00:00",
//               "2021-11-29T10:55:02.341+00:00", "2021-11-28T10:55:02.341+00:00","2021-11-27T10:55:02.341+00:00",

//               "2021-11-26T10:55:02.341+00:00", "2021-11-25T10:55:02.341+00:00","2021-11-24T10:55:02.341+00:00",
//               "2021-11-23T10:55:02.341+00:00", "2021-11-22T10:55:02.341+00:00","2021-11-21T10:55:02.341+00:00",
//               "2021-11-20T10:55:02.341+00:00", "2021-11-19T10:55:02.341+00:00","2021-11-18T10:55:02.341+00:00",

//               "2021-11-26T10:55:02.341+00:00", "2021-11-25T10:55:02.341+00:00","2021-11-24T10:55:02.341+00:00",
//               "2021-11-23T10:55:02.341+00:00", "2021-11-22T10:55:02.341+00:00","2021-11-21T10:55:02.341+00:00",
//               "2021-11-20T10:55:02.341+00:00", "2021-11-19T10:55:02.341+00:00","2021-11-18T10:55:02.341+00:00",

//               "2021-11-17T10:55:02.341+00:00", "2021-11-16T10:55:02.341+00:00","2021-11-15T10:55:02.341+00:00",
//               "2021-11-14T10:55:02.341+00:00", "2021-11-13T10:55:02.341+00:00","2021-11-12T10:55:02.341+00:00",
//               "2021-11-11T10:55:02.341+00:00", "2021-11-10T10:55:02.341+00:00","2021-11-09T10:55:02.341+00:00",

//               "2021-11-17T10:55:02.341+00:00", "2021-11-16T10:55:02.341+00:00","2021-11-15T10:55:02.341+00:00",
//               "2021-11-14T10:55:02.341+00:00", "2021-11-13T10:55:02.341+00:00","2021-11-12T10:55:02.341+00:00",
//               "2021-11-11T10:55:02.341+00:00", "2021-11-10T10:55:02.341+00:00","2021-11-09T10:55:02.341+00:00",
            
//             ]



// 2 months
// 2 entries per day for 4 to 5 days over 2 months



///// Below method to display date as 22/12/2021 //////////

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
/////////////////////////////////////////////////////////////

//////// Below method to minus date by 1 day  //////
// const userDate = new Date();
//  userDate.setDate(userDate.getDate()-1);

// console.log(userDate)
////////////////////////////////////////////////////

router.post("/expense/seed", async(req,res)=>{

   let seedItems;
   const endDate = new Date();
   // i.e, loop 3 times will generate 3 days data
            for (let i = 0; i < 1; i++){
                
                    //////////////the 1 means day. i.e, if wants to minus 3 days, change to 3
                    try {
                         const currDate = endDate.setDate(endDate.getDate()-1473) // minusing once per loop
                         seedItems = await DataExpense.create({
    
                            username: await User.findOne({username: "user1" }),
                            expensesentry:[
                                {
                                    amount: amount[Math.floor(Math.random() * amount.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    description: description[Math.floor(Math.random() * description.length)],
                                    date: currDate
                                    
                                },
                                {
                                    amount: amount[Math.floor(Math.random() * amount.length)],
                                    category: category[Math.floor(Math.random() * category.length)],
                                    description: description[Math.floor(Math.random() * description.length)],
                                    date: currDate
                                    
                                },
                                // {
                                //     amount: amount[Math.floor(Math.random() * amount.length)],
                                //     category: category[Math.floor(Math.random() * category.length)],
                                //     description: description[Math.floor(Math.random() * description.length)],
                                //     date: currDate
                                    
                                // },
    
                            ]})
                    
                     } catch (err) {
                             res.send(err.message);
    
                }
   
        
        }

        res.send(seedItems);
  

})

module.exports = router