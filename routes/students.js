const express = require("express"); // import - external

const studentsController = require("../controllers/studentsController");
const verifyAuth = require("../middlewares/verifyAuth");

const studentsRouter = express.Router();

// GET all
studentsRouter.get("/", studentsController.getStudents);

// GET with id
studentsRouter.get("/:id", studentsController.getStudentById);

// POST new
studentsRouter.post("/", verifyAuth, studentsController.createStudent);

// PUT with id
studentsRouter.put("/:id", verifyAuth, studentsController.updateStudent);

// DELETE with id
studentsRouter.delete("/:id", verifyAuth, studentsController.deleteStudent);

module.exports = studentsRouter;
