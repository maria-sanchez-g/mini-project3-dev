const mongoose = require("mongoose"); // MongoDB object modeling library

// constructor to define the structure of documents in a MongoDB collection. 
const Schema = mongoose.Schema; 

const userSchema = new Schema({
  name: { type: String, trim: true, required: true, unique: true},
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String },
},
{
    timestamps: true
}
);

module.exports = mongoose.model("user", userSchema);
