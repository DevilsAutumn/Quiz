const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  Date: {
    type: Date,
  },
  Quiz: {
    type: [Object],
    required: true,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);
