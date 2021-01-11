const Reservation = require("../models/ReservationSchema");

//make a reservation
exports.makeReservationController = async (req, res) => {
  const terrain = req.params.terrId;
  const user = req.params.userId;
  try {
    const newReservation = new Reservation({ terrain, user });
    const searchRes = await Reservation.findOne({
      terrain: terrain,
      user: user,
      pending: true,
    });
    if (searchRes) {
      return res.status(400).send({ msg: "A reservation is already made !" });
    }
    let result = await newReservation.save();
    res
      .status(200)
      .send({ reservation: result, msg: "Reservation is made !!" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "can not make this reservation" });
  }
};

// get all reservation
exports.getAllReservationController = async (req, res) => {
  try {
    let result = await Reservation.find().populate("terrain").populate("user");
    if (!result) {
      return res.status(400).send({ msg: "no reservation was found !!" });
    }
    res
      .status(200)
      .send({ reservations: result, msg: "All reservations was found !!" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error finding all reservations" });
  }
};
//get reservation by iD
exports.findReservationByIdController = async (req, res) => {
  let resId = req.params.resId;
  try {
    let result = await Reservation.findById({ _id: resId })
      .populate("terrain")
      .populate("user");
    if (!result) {
      return res.status(400).send({ msg: "no reservation with this ID !!" });
    }
    res
      .status(200)
      .send({ reservation: result, msg: "Found the reservation with this ID" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error finding a reservation by ID" });
  }
};

//confirm or decline a reservation

//delete a reservation
exports.deleteReservationController = async (req, res) => {
  const resId = req.params.resId;
  try {
    await Reservation.findByIdAndDelete({ _id: resId });
    res.status(200).send({ msg: "Reservation deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: "Error deleting this Reservation" });
  }
};
