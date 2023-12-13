const express = require("express"); // import - external
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const studentsRouter = require("./routes/students");
const teachersRouter = require("./routes/teachers");
const { connectToDB } = require("./utils/connectToDB");
const logRequestTime = require("./middlewares/logRequestTime");
const authRouter = require("./routes/auth");

const app = express(); // create express app
const port = 3001;

app.use(bodyParser.json());
app.use(logRequestTime);

app.use("/auth", authRouter);
app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);

app.listen(port, () => {
  console.log(`Listenning on port ${port}`); // listen on port
  connectToDB();
});
