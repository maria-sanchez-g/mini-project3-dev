const Models = require("../models");

const getAllUsers = (req, res) => {
  Models.User.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createUser = (req, res) => {
  const data = req.body;
  console.log(data);
  new Models.User(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getUser = (req, res) => {
  const id = req.params.id;
  Models.User.findById(id)
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

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
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const registerUser = async (req, res) => {
  try {
    const user = await Models.User.create(req.body);  // shotcut for save()
    res.status(201).json({ message: "User registered!", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await Models.User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: { _id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
};
