const getAllUsers = (req, res) => {
    res.json({message: "get all users"})
}

const createUser = (req, res) => {
    res.json({message: "create a user"})
}

const updateUser = (req, res) => {
    const id = req.params.id
    res.json({message: `update user id: ${id}`})
}

const deleteUser = (req, res) => {
    const id = req.params.id
    res.json({message: `delete user id: ${id}`})
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
}
