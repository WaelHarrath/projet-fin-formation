//imports
const express = require("express");
const router = express.Router();
const {
  makeReservationController,
  getAllReservationController,
  findReservationByIdController,
  deleteReservationController,
} = require("../controllers/ReservationRoutes.Controllers");

//make a reservation
router.post("/makeReservation/:terrId/:userId", makeReservationController);

//get all reservations
router.get("/getAllReservations", getAllReservationController);

//get reservation by ID
router.get("/reservations/:resId", findReservationByIdController);

// delete a reservation
router.delete("/deleteReservation/:resId", deleteReservationController);

module.exports = router;
