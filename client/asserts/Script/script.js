async function fetchAllQuestions() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/questions"
    );
    const data = await response.json();
    displayQuestions(data);
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function displayQuestions(questions) {
  const questionsContainer = document.getElementById(
    "questions-container"
  );
  questionsContainer.innerHTML = "";

  questions.forEach((question) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
    <p>${question.question}</p>
    <form class="question-form" id="form-${question._id}">
      ${question.options
        .map(
          (option) => `
        <input type="radio" name="${question._id}" value="${option}">
        <label>${option}</label><br>
      `
        )
        .join("")}
      <p class="feedback" id="feedback-${question._id}"></p>
    </form>
  `;
    questionsContainer.appendChild(questionElement);
  });
}

async function checkAllAnswers() {
  const questions = document.querySelectorAll(".question-form");
  const answers = [];
  let allQuestionsAnswered = true;

  questions.forEach((form) => {
    const questionId = form.id.split("-")[1];
    const selectedAnswer = form.querySelector(
      `input[name="${questionId}"]:checked`
    );
    if (!selectedAnswer) {
      allQuestionsAnswered = false;
      return;
    }
    answers.push({
      _id: questionId,
      selectedAnswer: selectedAnswer.value,
    });
  });

  if (!allQuestionsAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/check-answer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: answers }),
      }
    );
    const results = await response.json();

    results.forEach((result) => {
      const feedbackElement = document.getElementById(
        `feedback-${result._id}`
      );
      if (result.isCorrect) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.classList.add("correct");
      } else {
        feedbackElement.textContent = `Incorrect. The correct answer is: ${result.correctAnswer}`;
        feedbackElement.textContent += `\nFeedback: ${result.feedback}`;
        feedbackElement.classList.add("incorrect");
      }
    });
    document.getElementById("submitButton").disabled = true;
  } catch (error) {
    console.error("Error checking answers:", error);
  }
}

fetchAllQuestions();