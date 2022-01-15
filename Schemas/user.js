const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true
}

const opString = {
  type: String,
  required: false,
  default: undefined
}



const user = mongoose.Schema({
  _id: reqString,
  words: reqString,
  toggle:opString,
})

module.exports = mongoose.model("user", user)
