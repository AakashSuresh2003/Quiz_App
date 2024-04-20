const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz.model");
const {
  getAllQuestions,
  getQuestionById,
  createNewQuestion,
  updateQuestion,
  checkAnswer,
  deleteQuestion,
} = require("../controller/quiz.controller");

router.get("/questions", getAllQuestions);

router.get("/questions/:id", getQuestionById);

router.post("/questions", createNewQuestion);

router.put("/questions/:id", updateQuestion);

router.delete("/questions/:id", deleteQuestion);

router.post("/check-answer", checkAnswer);

module.exports = router;

