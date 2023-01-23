const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    unique: true,
  },
  address: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthtoken = async function () {
  try {
    let token23 = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23;
  } catch (error) {
    console.log(error);
  }
};

const User =mongoose.models.user || mongoose.model("user", userSchema);
module.exports = User;
