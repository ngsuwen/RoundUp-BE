const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const dataCashSchema = new Schema({
  username: {
    // make reference to user
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cashentry: 
    {
   
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  
});


module.exports = mongoose.model("dataCash", dataCashSchema);
