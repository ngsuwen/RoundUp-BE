const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataInvestmentsSchema = new Schema({
  username: {
    // make reference to user
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  investmentsentry: [
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
      quantity: {
        type: Number,
        required: true,
      },
      category: {
        type: String, // stocks, crypto, others (house,gold,etc), depending on which they select, will render a different autocomplete form
        required: true,
      },
      description: {
        type: String, // autocomplete form pulled from API
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("dataInvestments", dataInvestmentsSchema);
