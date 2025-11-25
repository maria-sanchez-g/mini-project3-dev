const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: { type: String, trim: true, required: true, unique: true},
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String },
},
{
    timestamps: true
}
);

module.exports = mongoose.model("user", userSchema);
