const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = new schema({
  avatar: { type: String },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "footBaller",
  },
});
module.exports = mongoose.model("user", UserSchema);
