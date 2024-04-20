const Quiz = require("../models/quiz.model");

const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Quiz.find();
    if (!allQuestions || allQuestions.length === 0)
      throw new Error("Error fetching allQuestions");
    res.status(200).json(allQuestions);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Quiz.findById(id);
    if (!question) throw new Error("Error fetching question");
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createNewQuestion = async (req, res) => {
  try {
    const newQuestion = await Quiz.create(req.body);
    if (!newQuestion) {
      return res.status(404).json({ error: "No data found" });
    }
    await newQuestion.save();
    console.log("New quiz question created:", newQuestion);
    res.status(201).json({ message: "Quiz question created successfully" });
  } catch (err) {
    console.error("Error creating quiz question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const updateQuiz = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updateQuiz, {
      new: true,
    });
    if (!updatedQuiz) throw new Error("Error updating the quiz");
    res.status(200).json(updatedQuiz);
  } catch (err) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuiz = await Quiz.findByIdAndDelete(id);
    if (!deleteQuiz) throw new Error("Error deleting the Quiz");
    res.status(200).json(deleteQuiz);
  } catch (err) {
    res.status(500).json("Internal server Error");
  }
};

const checkAnswer = async (req, res) => {
  try {
    const data = req.body.data;
    const result = await Promise.all(data.map(async (element) => {
      try {
        const elementData = await Quiz.findById(element._id);
        const isCorrect = element.selectedAnswer === elementData.correctanswer;
        return {
          _id: elementData._id,
          isCorrect: isCorrect,
          correctAnswer: elementData.correctanswer, // Optionally include the correct answer in the response
          feedback:elementData.feedback
        };
      } catch (err) {
        throw err;
      }
    }));
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error checking answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getAllQuestions,
  getQuestionById,
  createNewQuestion,
  updateQuestion,
  deleteQuestion,
  checkAnswer,
};
