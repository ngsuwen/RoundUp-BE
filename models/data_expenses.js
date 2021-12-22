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
      _id: false,
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
}, { timestamps: true })

module.exports=mongoose.model('dataExpenses',dataExpensesSchema)