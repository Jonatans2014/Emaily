const mongoose = require("mongoose");

//destructuring
const { Schema } = mongoose;

//mongodb Schema by using Mongoose
// get GoogleID
const userSchema = new Schema({
  //Mongodb Collection
  googleID: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
