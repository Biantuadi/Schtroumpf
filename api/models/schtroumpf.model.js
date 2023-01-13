const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const schtroumpfSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Schtroumpf" },
  imageUrl: {
    type: String,
    default: "https://www.smurf.com/characters-smurfs/handy.png",
  },
});

schtroumpfSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Schtroumpf", schtroumpfSchema);