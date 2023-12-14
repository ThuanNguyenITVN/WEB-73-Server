const { MongoClient } = require("mongodb");

// Connect MongoDB URL
const mongoDBUrl = "mongodb+srv://nguyenminhthuan2003st:1865@serverblog.qu2f9fp.mongodb.net/?retryWrites=true&w=majority"; // Update to use 127.0.0.1
const client = new MongoClient(mongoDBUrl);

// Database Name
const dbName = "web73-lesson";
const db = {};

const connectToDB = async () => {
  await client.connect();
  console.log("Connected successfully to database");
  const database = client.db(dbName);
  db.students = database.collection("students");
  db.users = database.collection("users");
};

module.exports = { connectToDB, db };
