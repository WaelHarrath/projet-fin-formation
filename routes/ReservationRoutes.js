//imports
const express = require("express");

const router = express.Router();
const {
  makeReservationController,
  getMyReservationsController,
  getTerrainReservationsController,
  deleteReservationController,
  confirmReservationController,
  declineReservationController,
} = require("../controllers/ReservationRoutes.Controllers");

//make a reservation
router.post("/makeReservation/:terrId/:userId", makeReservationController);

//get user reservations
router.post("/userReservations/:userId", getMyReservationsController);
//get terrain reservations
router.post("/terrainReservations/:ownerId", getTerrainReservationsController);
// confirm a reservation
router.post("/confirmReservation/:resId", confirmReservationController);
//decline a reservation
router.post("/declineReservation/:resId", declineReservationController);

// delete a reservation
router.delete("/deleteReservation/:resId", deleteReservationController);

module.exports = router;
