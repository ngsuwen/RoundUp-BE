const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const tokenSchema=new Schema({
  username: {
    // make reference to user
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refreshToken:{
    type: String,
    required: true,
  }
})

module.exports=mongoose.model('Token',tokenSchema)