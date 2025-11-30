const Models = require("../models");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => {
  Models.User.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    // Check if email already exists
    const existing = await Models.User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await Models.User.create({ name, email, password });

    return res.status(201).json({
      result: 201,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("createUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUser = (req, res) => {
  const id = req.params.id;
  Models.User.findById(id)
    .then((data) => res.send({result: 200, data: data}))
    .catch((err) => {
      console.log(err);
      res.send({result: 500, error: err.message })
    });
}

const updateUser = (req, res) => {
  const data = req.body;
  console.log(data);
  const id = req.params.id;
  Models.User.findByIdAndUpdate(id, data, { new: true })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  Models.User.findByIdAndDelete(id)
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
        console.log(err);
        res.send({result: 500, error: err.message})
    })
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Models.User.findOne({ email });

    // If no user or wrong password, send the same message
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Create a token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      result: 200,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
};
