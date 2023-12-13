const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { db } = require("../utils/connectToDB");

const register = async (req, res) =>{
  const {name,password} = req.body;
  const checkExistedName = async () =>{
    const foundUserByName = await db.users.findOne({
      name: name
    });
    if (foundUserByName) return true;
    return false;
  }
  if( await checkExistedName() ){
    res.json({
      message: "User Already Exists",
    })
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = {
      name: name,
      password: hashedPassword,
    };
    db.users.insertOne(newUser);
    res.status(201).json({
      message: "Register Successfully !",
      data: newUser
    });
  }
};

const login = async (req, res) => {
  // Create checkAcount function to check students account with name and age
  const {name,password} = req.body;
  const checkAccount =  async () => {
    const foundUserByName = await db.users.findOne({
      name: name,
    });
    if (foundUserByName) {
      const isPasswordMatch = await bcrypt.compare(password, foundUserByName.password)
      return isPasswordMatch;
    }
    return false;
  };

  if (await checkAccount()) {
    const token = jwt.sign({ name: name }, "WEB73-LESSON");
    res.json({ user: req.body, token: token });
  } else {
    res.json({
      message: "Wrong name or password"
    });
  }
};

module.exports = { login,register };
