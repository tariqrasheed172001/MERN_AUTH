import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token,foundUser });
    } else {
      return res.status(400).json({ msg: "Wrong password" });
    }
  } else {
    return res.status(400).json({ msg: "User does not exist, Register first!" });
  }
};

export const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

export const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

export const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  let phone = await User.findOne({phone: req.body.phone});
  if(foundUser){
    return res.status(400).json({ msg: "Email already in use" })
  }else if(phone){
    return res.status(400).json({ msg: "Phone already in use" });
  }else if(foundUser === null) {
    let { username, email,phone,profession, password } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        profession: profession,
        phone: phone,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  }
};

export const getUserById = async (req,res) => {
  let {id} = req.params;

  try {
    // Find the user with the given id
    let foundUser = await User.findById(id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.json({ foundUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

}
