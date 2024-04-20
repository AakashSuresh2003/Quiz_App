const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  feedback: {
    type: String,
    required: true,
  },
  correctanswer: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
