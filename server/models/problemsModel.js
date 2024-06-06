const mongoose = require("mongoose");
const fs = require("fs");

const exampleSchema = new mongoose.Schema({}, { strict: false });
const testCaseSchema = new mongoose.Schema({},{ strict: false});
const problemSchema = new mongoose.Schema({
  title: {type:String,unique:true},
  topic: String,
  difficulty: String,
  description: String,
  constraints: [String], 
  inputFormat: String,
  outputFormat: String,
  examples: [exampleSchema], 
  testCasesCpp:[testCaseSchema],
  testCasesPy:[testCaseSchema]
});


const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;