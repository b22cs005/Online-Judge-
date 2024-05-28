const mongoose = require("mongoose");
const fs = require("fs");

const exampleSchema = new mongoose.Schema({}, { strict: false });
const constraintSchema = new mongoose.Schema({}, { strict: false });
const problemSchema = new mongoose.Schema({
  title: {type:String,unique:true},
  topic: String,
  difficulty: String,
  description: String,
  constraints: constraintSchema, 
  inputFormat: String,
  outputFormat: String,
  examples: [exampleSchema] 
});


const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;