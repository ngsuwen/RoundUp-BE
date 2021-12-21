const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

// const seedData = require('./seedData')

app.use(express.json());

// const
const PORT=process.env.PORT;
const DATABASE=process.env.DATABASE;
const MONGO_USER=process.env.MONGO_USER;
const MONGO_PASSWORD=process.env.MONGO_PASSWORD;
const MONGO_BASE_URL=process.env.MONGO_BASE_URL;
const MONGO_URL=`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_BASE_URL}/${DATABASE}?retryWrites=true&w=majority`

// controllers
const sessionController = require('./controller/sessionController')
app.use('/session', sessionController)

const dataController = require("./controller/dataController")
app.use("/data", dataController)

// connect to mongoose
mongoose.connect(MONGO_URL).then(async()=>{
  console.log('database connected')
  // store test users
  // await seedData();
  app.listen(PORT, () => { console.log('listening on', PORT) });
})
