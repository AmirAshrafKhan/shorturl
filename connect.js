const mongoose = require("mongoose");

async function connnectToMongodb(url) {
  return mongoose.connect(url);
}

module.exports = {
  connnectToMongodb,
};
