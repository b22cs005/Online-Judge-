const fs = require('fs');
const Problem = require('../models/problemsModel');
const path = require("path");

async function insertProblems() {
  const filePath = path.join(__dirname, "../models/problems.json");
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const problem of data) {
    try {
      await Problem.findOneAndUpdate(
        { title: problem.title },
        problem,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Upserted problem with title: ${problem.title}`);
    } catch (err) {
      console.error(`Error upserting problem with title: ${problem.title}`, err);
    }
  }
}

module.exports = insertProblems;
