const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { name, age, address, email, password, cpassword } = req.body; // Get user input

    if (!(email && password && cpassword)) {
      res.status(400).json({ message: "Enter complete details" }); // Validate user input
    }

    if (password !== cpassword) {
      res.status(400).json({ message: "password doesnot match" });
    }

    const oldUser = await User.findOne({ email }); // Validate if user exist in our database

    if (oldUser) {
      return res
        .status(401)
        .json({ message: " Already have a account with this Email." });
    }

    const user = await User.create({
      name,
      age,
      address,
      email,
      password,
      cpassword,
    });

    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_KEY
    );

    res.status(201).json(token);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Get user input
    if (!(email && password)) {
      res.status(400).json({ message: "fill all details" });
    }

    const user = await User.findOne({ email }); // Validate if user exist in our database

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await user.generateAuthtoken();

      await user.save();

      res.status(200).json(token);
    } else {
      console.log("wrong password");
      res.status(401).json("wrong password");
    }
  } catch (err) {
    console.log(err);
  }
};

const users = async (req, res) => {
  try {
    const Users = await User.find({}, { tokens: 0, __v: 0 });

    res.status(201).json(Users);
  } catch (error) {
    console.log(error, "error");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    const users = await User.findByIdAndDelete({ _id: id });

    res.status(201).send("done");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.query;

  let details = req.body;

  try {
    await User.findByIdAndUpdate(
      { _id: id },
      { $set: details },
      { new: true, projection: { tokens: 0, __v: 0, password: 0 } },
      function (err, result) {
        if (err) {
          console.log(err);
        }
        res.status(201).json(result);
      }
    ).clone();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, signup, users, deleteUser, updateUser };
