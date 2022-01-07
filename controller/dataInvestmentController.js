// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config()

// for cron job
const cron = require('node-cron')
const _ = require('underscore')

// Schema
const User = require("../models/user");
const DataInvestment = require("../models/data_investments");

// Routes

// get all investment
router.get("/", async(req, res) => {
  let investment
  try{
    investment = await DataInvestment.find({})
  }catch(error){
    res.status(500).send({message: 'Unexpected Error'})
    return
  }
  res.send(investment)
});


// get 
router.get("/user/:usernameid/", async (req, res) => {
  const usernameid = req.params.usernameid
  let investment;
  try {
    investment = await DataInvestment.find({username:usernameid});
  } catch (error) {
    res.status(500).send({ message: "Unexpected Error" });
    return;
  }
  res.send(investment);
});

// get expense by username and monthly data
// router.get("/expense/user/:usernameid/:monthOfExpense", async (req,res)=>{
//     const usernameid = req.params.usernameid
//     const monthOfExpense = req.params.monthOfExpense
//     const expense = await DataExpense.find({username:usernameid, 'expensesentry.date':{'$gte': new Date(`${monthOfExpense}-01`), '$lte': new Date(`${monthOfExpense}-31`)}})
//     res.send(expense)
// })

// show route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const investment = await DataInvestment.findById(id).populate("username");
  res.send(investment);
});

// const for crypto api
const CRYPTO_URL=process.env.CRYPTO_URL;

// show crypto current value
router.get("/crypto/:ticker/current", async (req, res) => {
  const { ticker } = req.params;
  const listResponse = await fetch(`https://${CRYPTO_URL}/coins/list`)
  const list = await listResponse.json()
  const coin = list.filter(element=>element.symbol===ticker)
  const id = coin[0].id
  const response = await fetch(`https://${CRYPTO_URL}/coins/${id}`)
  const data = await response.json()
  const currentValue = data.market_data.current_price.sgd.toString()
  res.send({value: currentValue})
});

// show stocks certain date (DD-MM-YYYY)
router.get("/crypto/:ticker/:date", async (req, res) => {
  const { ticker, date } = req.params;
  const listResponse = await fetch(`https://${CRYPTO_URL}/coins/list`)
  const list = await listResponse.json()
  const coin = list.filter(element=>element.symbol===ticker)
  const id = coin[0].id
  const response = await fetch(`https://${CRYPTO_URL}/coins/${id}/history?date=${date}`)
  const data = await response.json()
  const currentValue = data.market_data.current_price.sgd.toString()
  res.send({value: currentValue})
});

// const for stocks api
const STOCKS_URL=process.env.STOCKS_URL;
const STOCKS_KEY=process.env.STOCKS_KEY;

// show stocks current value
router.get("/stocks/:ticker/current", async (req, res) => {
  const { ticker } = req.params;
  const response = await fetch(`https://${STOCKS_URL}/quote?symbol=${ticker.toUpperCase()}&token=${STOCKS_KEY}`)
  const data = await response.json()
  const currentValue = data.c.toString()
  res.send({value: currentValue})
});

// show stocks certain date (YYYY-MM-DD)
router.get("/stocks/:ticker/:date", async (req, res) => {
  const { ticker, date } = req.params;
  const dateFormat = date.replace(/-/g, '/')
  const unixTime = await fetch(`https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=${dateFormat}`)
  const unixTimeData = await unixTime.json()
  const response = await fetch(`https://${STOCKS_URL}/stock/candle?symbol=${ticker.toUpperCase()}&resolution=D&from=${unixTimeData.UnixTimeStamp}&to=${unixTimeData.UnixTimeStamp}&token=${STOCKS_KEY}`)
  const data = await response.json()
  const value = data.c[0].toString()
  res.send({value: value})
});

// create route investment
router.post("/", async (req, res) => {
  let createdInvestment;
  try {
    createdInvestment = await DataInvestment.create(req.body);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(createdInvestment);
});

router.delete("/:id", async (req, res) => {
  let deletedInvestment;
  try {
    deletedInvestment = await DataInvestment.findByIdAndRemove(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
    return;
  }
  res.send(deletedInvestment);
});

router.get("/:id/edit", async (req, res) => {
  let editedInvestment;
  try {
    editedInvestment = await DataInvestment.findById(req.params.id);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
  }
  res.send(editedInvestment);
});

router.put("/:id/edit", async (req, res) => {
  let editedInvestment;
  try {
    editedInvestment = await DataInvestment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  } catch (err) {
    res.status(400).send({ message: "Invalid request body" });
  }
  res.send(editedInvestment);
});


////////////////////////////////// START OF CRON JOB //////////////////////////// 

//   # ┌────────────── second (optional)
//   # │ ┌──────────── minute
//   # │ │ ┌────────── hour
//   # │ │ │ ┌──────── day of month
//   # │ │ │ │ ┌────── month
//   # │ │ │ │ │ ┌──── day of week
//   # │ │ │ │ │ │
//   # │ │ │ │ │ │
//   # * * * * * *

// cron.schedule('0 16 * * * ', async () => {
//     try{
//         investment = await DataInvestment.find({})
//       } catch(error){
//         console.log('error updating stock/crypto prices at close')
//         return
//       }
//   },
//   {
//     scheduled: true,
//     timezone: "America/New_York"
//   });

cron.schedule('*/1 * * * *', async () => {

  try{
      console.log('cron job activated')
    
      investment = await DataInvestment.find({})

      // console.log('investment:',investment)

      const entriesByTicker = _(investment).groupBy((element)=>{
        return element.investmentsentry.ticker
        })

      const uniqueTickerList = Object.keys(entriesByTicker)

      console.log('uniqueTickerList:',uniqueTickerList)
      // console.log('entriesByTicker:',entriesByTicker)

      // calculate total qty of stocks/crypto
      for (let ticker of uniqueTickerList){
      let totalQuantity = 0 
      entriesByTicker[ticker].map((transaction)=>{
        totalQuantity += transaction['investmentsentry']['quantity']
      })
      console.log(`Quantity of ${ticker}:${totalQuantity}`)  
      } 

      // need to fetch all prices from uniqueTickerList, store as key value pair in uniqueTickerList
      let tickerAndPriceArr = []

      for (let ticker of uniqueTickerList){

      const priceFetcher = async () => {

      // calculate total qty of stocks/crypto
      let totalQuantity = 0 
      entriesByTicker[ticker].map((transaction)=>{
      totalQuantity += transaction['investmentsentry']['quantity']
      })
      console.log(`Quantity of ${ticker}:${totalQuantity}`)  
  

      if(entriesByTicker[ticker][0]['investmentsentry']['category']==='US stocks'){
          const response = await fetch(`https://${STOCKS_URL}/quote?symbol=${ticker.toUpperCase()}&token=${STOCKS_KEY}`) 
          const data = await response.json()
          const stringifyData = data.c.toString()
          const parsedStockPriceObj = {value:stringifyData}
          parsedStockPriceObj['ticker']=ticker
          parsedStockPriceObj['quantity']=totalQuantity
          console.log('parsedStockPriceObj:',parsedStockPriceObj)
          return parsedStockPriceObj
      }
  
      if(entriesByTicker[ticker][0]['investmentsentry']['category']==='Crypto'){
          const listResponse = await fetch(`https://${CRYPTO_URL}/coins/list`)
          const list = await listResponse.json()
          const coin = list.filter(element=>element.symbol===ticker.toLowerCase())
          console.log('coin:',coin)
          const id = coin[0].id
          console.log('id:',id)
          const response = await fetch(`https://${CRYPTO_URL}/coins/${id}`)
          const data = await response.json()
          stringifyData = data.market_data.current_price.sgd.toString()
          const parsedCryptoPriceObj = {value:stringifyData}
          console.log('cryptoprice:',data.market_data.current_price.sgd.toString())
          parsedCryptoPriceObj['ticker']=ticker
          parsedCryptoPriceObj['quantity']=totalQuantity
          console.log('parsedCryptoPriceObj:',parsedCryptoPriceObj)
          return parsedCryptoPriceObj
          }
      }

        const fetchedPrice = await priceFetcher()
        tickerAndPriceArr.push(fetchedPrice)

        }

      console.log('tickerAndPriceArr:',tickerAndPriceArr)

      // then for each ticker in entriesByTicker, and for each transaction in the ticker, we will have to push {date:'',price:''} into the priceHistory arr field using spread operator. 
      // need to update mongo database

      tickerAndPriceArr.forEach((element)=>{
        let priceHistoryEntry={
          'date': Date.now(),
          'price': element.value,
          'quantity': element.quantity,
        }
        entriesByTicker[element.ticker].forEach( async (transaction)=>{
          try {
            // updating mongoDB
            await DataInvestment.findByIdAndUpdate(
              transaction._id,
              { $push: { priceHistory: priceHistoryEntry }},
              { new: true }
            )

            // FOR RESETTING //
            // await DataInvestment.findByIdAndUpdate(
            //   transaction._id,
            //   { priceHistory: [] },
            //   console.log('transactionid:',transaction._id)
            // )

          } catch (err) {
            res.status(400).send({ message: "Invalid request body" });
          }
      })
    })

    // console.log('updatedEntriesByTicker:',entriesByTicker['TSLA'][0].priceHistory)

    } catch(error){
      console.log('error updating stock/crypto prices at close:',error)
      return
    }
})


////////////////////////////////// END OF CRON JOB //////////////////////////// 

module.exports = router;
