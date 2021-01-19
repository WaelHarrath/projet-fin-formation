const User = require("../models/UserSchema");
const Terrain = require("../models/TerrainSchema");
const Reservation = require("../models/ReservationSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//User CRUD Section
//get all user controller
exports.getAllUserController = async (req, res) => {
  try {
    const result = await User.find();
    if (!result) {
      return res.status(400).send({ msg: "No user Found !" });
    }
    res.status(200).send({ users: result, msg: "Found all users" });
  } catch (error) {
    res.status(500).send({ errors: error, msg: "Error getting all users" });
  }
};

//add a user
exports.addUserController = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const newUser = new User({ fullName, email, password, role });
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ msg: "User Already exists !!" });
    }
    //hashage du password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    newUser.password = hashedPassword;

    const payload = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    };
    const token = await jwt.sign(payload, process.env.SecretKey, {
      expiresIn: 7200,
    });
    res.status(200).send({
      user: newUser,
      token: ` Bearer ${token}`,
      msg: "User is saver",
    });
  } catch (error) {
    res.status(500).send({ errors: error, msg: "can not save the user" });
  }
};
// update a user
exports.updateUserController = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const userId = req.params.userId;
  try {
    const userExist = await User.findOne({ _id: userId });
    if (userExist) {
      userExist.fullName = fullName;
      userExist.email = email;
      userExist.role = role;
      //hashage du password
      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const hashedPassword = await bcrypt.hash(password, genSalt);

      userExist.password = hashedPassword;
      await userExist.save();
      res
        .status(200)
        .send({ user: userExist, msg: "user updated with success !!" });
    } else {
      return res
        .status(400)
        .send({ msg: "no user found with this id to update" });
    }
  } catch (error) {
    res.status(500).send({ errors: error, msg: "Error Updating the user" });
  }
};
// delete user controller

exports.deleteUserController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await User.findByIdAndDelete({ _id: userId });
    if (!result) {
      return res.status(400).send({ msg: "no user with this id to delete !" });
    }
    res.status(200).send({ deleted: result, msg: "User deleted" });
  } catch (error) {
    res.status(500).send({ errors: error, msg: "Error deleting the user" });
  }
};
//Terrain Crud Section
// get all Terrains

exports.getAllTerrainController = async (req, res) => {
  try {
    const result = await Terrain.find().populate("owner");
    if (!result) {
      return res.status(400).send({ msg: "No Terrain Found !!" });
    }
    res.status(200).send({ terrains: result, msg: "Found all terrains" });
  } catch (error) {
    res.status(500).send({ errors: error, msg: "Error finding all terrains" });
  }
};
//delete terrain
exports.deleteTerrainController = async (req, res) => {
  const terrainId = req.params.terrainId;
  try {
    let result = await Terrain.findByIdAndDelete({
      _id: terrainId,
    });
    res.send({ deleted: result, msg: "Terrain deleted successfully" });
  } catch (error) {
    res.send({ errors: error, msg: "Error deleting this Terrain" });
  }
};

//Reservation section

//get all reservations
exports.getAllReservationsController = async (req, res) => {
  try {
    const result = await Reservation.find()
      .populate("terrain")
      .populate("terrainOwner")
      .populate("user");
    if (!result) {
      return res.status(400).send({ msg: "No reservation Found" });
    }
    res.status(200).send({ reservations: result, msg: "Got All reservations" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error getting all reservations" });
  }
};
// delete a reservation
exports.deleteReservationController = async (req, res) => {
  const resId = req.params.resId;
  try {
    const reservation = await Reservation.findById({ _id: resId });

    const searchedTerr = await Terrain.findById({ _id: reservation.terrain });
    searchedTerr.reserved = false;
    await searchedTerr.save();
    const result = await Reservation.findByIdAndDelete({ _id: resId });
    res
      .status(200)
      .send({ reservation: result, msg: "Reservation deleted with success" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error deleting the Reservation" });
  }
};
