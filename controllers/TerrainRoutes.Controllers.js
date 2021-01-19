const Terrain = require("../models/TerrainSchema");
const fs = require("fs");

exports.createTerrainController = async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const format = req.body.format;
  const type = req.body.type;
  const surface = req.body.surface;
  const price = req.body.price;
  const images = req.files;

  const owner = req.params.userId;

  try {
    const newTerrain = new Terrain({
      name,
      address,
      phone,
      format,
      type,
      surface,
      price,
      owner,
    });
    const searchedTerrain = await Terrain.findOne({ name, address });
    if (searchedTerrain) {
      return res.status(400).send({ msg: "Terrain already exists!" });
    }
    if (images.length != 0) {
      for (let i = 0; i < images.length; i++) {
        newTerrain.terrainImages.push(images[i].filename);
      }
    } else {
      newTerrain.terrImages = images.filename;
    }

    await newTerrain.save();

    res.status(200).send({ terrain: newTerrain, msg: "Terrain is saved" });
  } catch (error) {
    res.status(500).send({ msg: "can not save the terrain!!" });
  }
};

exports.findTerrainByIdController = async (req, res) => {
  const userId = req.params.userId;
  const terrainId = req.params.terrainId;
  try {
    let result = await Terrain.findOne({ owner: userId, _id: terrainId });
    if (result === undefined) {
      return res.send({ msg: "no terrain with this id" });
    } else {
      res.send({ response: result, msg: "got the terrain !" });
    }
  } catch (error) {
    res.send({ msg: "can not get terrains!" });
  }
};

exports.allUserTerrainsController = async (req, res) => {
  const userId = req.params.userId;
  try {
    let result = await Terrain.find({ owner: userId });
    if (result === undefined) {
      return res.send({ msg: "no terrains to show" });
    } else {
      res.send({ response: result, msg: "got all terrains" });
    }
  } catch (error) {
    res.send({ msg: "can not get terrains!" });
  }
};
exports.searchTerrainController = async (req, res) => {
  let searched = req.body.searchAdr;
  try {
    if (searched === "") {
      res.status(400).send({ msg: "no terrain with this address" });
    } else {
      let result = await Terrain.find({
        address: { $regex: searched },
        reserved: false,
      });

      res.status(200).send({ data: result });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

exports.updateTerrainController = async (req, res) => {
  const terrId = req.params.terrainId;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const format = req.body.format;
  const type = req.body.type;
  const surface = req.body.surface;
  const price = req.body.price;
  const images = req.files;

  try {
    await Terrain.findOne({ _id: terrId }, (err, searchedTerr) => {
      if (err) {
        res.status(400).send({ msg: "no Terrain found" });
      }
      if (searchedTerr) {
        if (name) searchedTerr.name = name;
        if (address) searchedTerr.address = address;
        if (phone) searchedTerr.phone = phone;
        if (format) searchedTerr.format = format;
        if (type) searchedTerr.type = type;
        if (surface) searchedTerr.surface = surface;
        if (price) searchedTerr.price = price;

        if (images) {
          if (images.length != 0) {
            if (searchedTerr.terrainImages.length != 0) {
              for (let i = 0; i < searchedTerr.terrainImages.length; i++) {
                fs.unlink(
                  "./imageUploads/" + searchedTerr.terrainImages[i],
                  function (err) {
                    if (err) return console.log("images unlink error", err);
                  }
                );
              }
            }

            for (let i = 0; i < images.length; i++) {
              searchedTerr.terrainImages.unshift(images[i].filename);
            }
            searchedTerr.terrainImages.splice(
              3,
              searchedTerr.terrainImages.length - 1
            );
          }
        }

        let result = searchedTerr.save();

        if (result) {
          res.status(200).send({ updated: result, msg: "Terrain updated" });
        } else {
          res.status(400).send({ msg: "error while updating" });
        }
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "updating was unsuccessful !!" });
  }
};

exports.deleteTerrainController = async (req, res) => {
  const userId = req.params.userId;

  const terrainId = req.params.terrainId;
  try {
    let result = await Terrain.findByIdAndDelete({
      owner: userId,
      _id: terrainId,
    });
    res.send({ msg: "deleted successfully" });
  } catch (error) {
    res.send({ msg: "deleted unsuccessfully" });
  }
};
