const env = require("dotenv")
env.config()
const express = require("express");
app = express();

app.get("/", (req, res) => {
  res.status(200).json({ Message: "Hello World" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});
