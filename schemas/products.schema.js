const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title : {
    type: String,
    required : true 
  },
  content : {
    type : String,
    required : true
  },
  author : {
    type: String,
    required : true
  },
  password :{
    type : String,
    required : true
  },
  status : {
    type: String,
    default: 'FOR_SALE'
  },
  createdAt : {
    type: Date, 
    default: Date.now
  },
});

module.exports = model("Product", productSchema);