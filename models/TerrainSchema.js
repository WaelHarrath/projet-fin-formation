const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TerrainSchema = new schema({
  name: { type: String },
  address: { type: String },
  phone: { type: String },
  format: { type: String },
  type: { type: String },
  surface: { type: String },
  price: { type: String },
  reserved: { type: Boolean, default: false },
  terrainImages: [
    {
      type: String,
    },
  ],
  owner: { type: schema.Types.ObjectId, ref: "user" },
});
module.exports = mongoose.model("terrain", TerrainSchema);
