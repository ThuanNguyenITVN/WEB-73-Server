const { ObjectId } = require("mongodb");

const { db } = require("../utils/connectToDB");

const getStudents = async (req, res) => {
  const students = await db.students
    .find({ $or: [{ age: { $lte: 18 } }, { age: { $gt: 20 } }] })
    .sort({ age: -1 })
    .toArray();
  res.status(200).json({
    message: "Get successfully",
    data: students,
  });
};

const getStudentById = async (req, res) => {
  const id = req.params.id;
  const student = await db.students.findOne({
    _id: new ObjectId(id),
  });
  res.status(200).json({
    message: "Get successfully",
    data: student,
  });
};

const createStudent = async (req, res) => {
  const { name, age } = req.body;
  const newStudent = {
    name: name,
    age: age,
    type: "student",
  };
  await db.students.insertOne(newStudent);
  res.status(201).json({
    message: "Create successfully",
    data: newStudent,
  });
};

const updateStudent = async (req, res) => {
  const id = req.params.id;
  const { name, age, type } = req.body;
  await db.students.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        name: name,
        age: age,
        type: type,
      },
    }
  );
  res.status(200).json({
    message: "Update successfully",
    data: { ...req.body, _id: id },
  });
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  await db.students.deleteOne({
    _id: new ObjectId(id),
  });
  res.status(200).json({
    message: "Delete successfully",
    data: { _id: id },
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
