const Reservation = require("../models/ReservationSchema");
const Terrain = require("../models/TerrainSchema");
const User = require("../models/UserSchema");
//make a reservation
exports.makeReservationController = async (req, res) => {
  const terrain = req.params.terrId;
  const user = req.params.userId;
  const matchDate = req.params.matchDate;
  console.log("match Date", matchDate);
  console.log(req.body);
  try {
    const newReservation = new Reservation({ terrain, user, matchDate });
    const searchRes = await Reservation.findOne({
      terrain: terrain,
      user: user,
      pending: true,
    }); 
    if (searchRes) {
      return res.status(400).send({ msg: "A reservation is already made !" });
    }
    const searchTerr = await Terrain.findById({ _id: terrain });
    newReservation.terrainOwner = searchTerr.owner;
    const result = await newReservation.save();

    res
      .status(200)
      .send({ reservation: result, msg: "Reservation is made !!" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "can not make this reservation" });
  }
};
//find terrain reservations
exports.getTerrainReservationsController = async (req, res) => {
  const ownerId = req.params.ownerId;

  try {
    const result = await Reservation.find({ terrainOwner: ownerId })
      .populate("user")
      .populate("terrain");
    if (!result) {
      return res
        .status(400)
        .send({ msg: "can't find reservations for this owner" });
    }

    res
      .status(200)
      .send({ reservations: result, msg: " terrain reservations success !" });
  } catch (error) {
    res.status(500).send({ msg: "error getting terrain reservations" });
  }
};

//find my reservations
exports.getMyReservationsController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await Reservation.find({ user: userId })
      .populate("user")
      .populate("terrain");
    if (!result) {
      return res
        .status(400)
        .send({ msg: "can't find reservations for this user" });
    }

    res
      .status(200)
      .send({ reservations: result, msg: " user reservationsuccess !" });
  } catch (error) {
    res.status(500).send({ msg: "error getting user reservations" });
  }
};
//confirm a reservation
exports.confirmReservationController = async (req, res) => {
  const resId = req.params.resId;

  try {
    let result = await Reservation.findById({ _id: resId });
    if (!result) {
      return res.status(400).send({ msg: "no reservation with this ID !!" });
    } else {
      result.pending = false;
      result.confirmed = true;
      result.confirmedAt = Date.now();

      await result.save();
      const searchedTerrain = await Terrain.findById({ _id: result.terrain });
      searchedTerrain.reserved = true;
      await searchedTerrain.save();
      res
        .status(200)
        .send({ reservation: result, msg: "reservation confirmed !" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error confirming this reservation" });
  }
};
//decline a reservation
exports.declineReservationController = async (req, res) => {
  const resId = req.params.resId;

  try {
    let result = await Reservation.findById({ _id: resId });
    if (!result) {
      return res.status(400).send({ msg: "no reservation with this ID !!" });
    } else {
      result.pending = false;
      result.confirmed = false;
      result.confirmetAt = Date.now();

      await result.save();
      const searchedTerr = await Terrain.findById({ _id: result.terrain });
      searchedTerr.reserved = false;
      await searchedTerr.save();
      res
        .status(200)
        .send({ reservation: result, msg: "reservation declined !" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error declining this reservation" });
  }
};
//delete a reservation
exports.deleteReservationController = async (req, res) => {
  const resId = req.params.resId;
  try {
    const reservation = await Reservation.findById({ _id: resId });

    const searchedTerr = await Terrain.findById({ _id: reservation.terrain });
    searchedTerr.reserved = false;
    await searchedTerr.save();
    const result = await Reservation.findByIdAndDelete({ _id: resId });
    res.status(200).send({ reservation: result, msg: "Reservation deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error deleting this Reservation" });
  }
};
