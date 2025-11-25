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

const updateUser = (req, res) => {
  const data = req.body;
  console.log(data);
  const id = req.params.id;
  Models.User.findByIdAndUpdate(id, data, {new: true})
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
        console.log(err);
        res.send({result: 500, error: err.message})
    })
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

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
