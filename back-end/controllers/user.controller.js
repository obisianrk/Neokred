const {
  hashPassword,
  comparePassword,
  generateAccessToken,
} = require("../utils/common");
const User = require("../models/userModel");

module.exports.userRegistration = async (req, res) => {
  try {
    let userData = req.body;
    userData.password = req.body.password
      ? await hashPassword(req.body.password)
      : null;

    addUserResponse = await User.create(userData);

    const tokenPayload = {
      name: addUserResponse.name,
      email: addUserResponse.email,
    };
    const token = await generateAccessToken(tokenPayload);

    res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    let userData = await User.findOne({ email: email });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    passwordVerified = await comparePassword(password, userData.password);

    if (!passwordVerified) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const tokenPayload = { name: userData.name, email: userData.email };
    const token = await generateAccessToken(tokenPayload);

    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userEmail = req.user.email;

    let userDetail = await User.findOne({ email: userEmail });

    if (!userDetail) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Successful", data: userDetail });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
