const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ReservationSchema = new schema({
  terrain: { type: schema.Types.ObjectId, ref: "terrain" },
  terrainOwner: { type: schema.Types.ObjectId, ref: "user" },
  user: { type: schema.Types.ObjectId, ref: "user" },
  pending: { type: Boolean, default: true },
  confirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  matchDate: { type: Date },
  confirmedAt: { type: Date },
});
module.exports = mongoose.model("reservation", ReservationSchema);
