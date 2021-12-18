const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const dataExpensesSchema=new Schema({
  username: { // make reference to user 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expensesentry:[
    {
     date:{
        type: Date,
        default: Date.now,
        required: true,
     },
     amount:{
        type: Number,
        required: true,
     },
     category:{
        type: String,
        required: true
     },
     description:{
       type: String,
       required: true
     }
    }
]
})

module.exports=mongoose.model('dataExpenses',dataExpensesSchema)