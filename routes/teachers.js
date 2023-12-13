const express = require("express"); // import - external

const STUDENTS = require("../mock/students"); // import - internal

const teachersRouter = express.Router();

teachersRouter.get("/", (req, res) => {
  res.json(STUDENTS);
});

teachersRouter.get("/add", (req, res) => {
  const newStudent = { name: "Alexx", age: 12 }; // hardcode
  STUDENTS.push(newStudent);
  res.json(STUDENTS);
});

module.exports = teachersRouter;
