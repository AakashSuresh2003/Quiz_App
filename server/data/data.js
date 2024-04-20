const questions = [
  {
    _id: 1,
    question: "What is Node.js?",
    options: [
      { id: 1, text: "A JavaScript framework for building web applications" },
      {
        id: 2,
        text: "A runtime environment for executing JavaScript code outside the browser",
      },
      { id: 3, text: "A relational database management system" },
      { id: 4, text: "A front-end development tool" },
    ],
    correctAnswer: 2,
    feedback:
      "Node.js is a runtime environment for executing JavaScript code outside the browser. It uses the V8 JavaScript engine from Google Chrome and allows developers to run JavaScript on the server-side. It is commonly used for building scalable network applications, thanks to its event-driven, non-blocking I/O model. Remember, Node.js is not a JavaScript framework for building web applications, a relational database management system, or a front-end development tool.",
  },
  {
    _id: 2,
    question:
      "Which module is commonly used in Node.js to perform asynchronous operations?",
    options: [
      { id: 1, text: "fs (File System)" },
      { id: 2, text: "http" },
      { id: 3, text: "events" },
      { id: 4, text: "path" },
    ],
    correctAnswer: 1,
  },
];

module.exports = questions;
