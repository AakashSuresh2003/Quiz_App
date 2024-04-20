const env = require("dotenv")
env.config()
const express = require("express");
const cors = require("cors")
const quizRouter = require("./router/quiz.router")
app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",quizRouter)

app.get("/", (req, res) => {
  res.status(200).json({ Message: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});
