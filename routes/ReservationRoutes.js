//imports
const express = require("express");
const isTerrainOwner = require("../middleware/isTerrainOwner");
const isUser = require("../middleware/isUser");
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
router.post(
  "/makeReservation/:terrId/:userId/:matchDate",
  isUser(),
  makeReservationController
);

//get user reservations
router.post("/userReservations/:userId", isUser(), getMyReservationsController);
//get terrain reservations
router.post(
  "/terrainReservations/:ownerId",
  isTerrainOwner(),
  getTerrainReservationsController
);
// confirm a reservation
router.post(
  "/confirmReservation/:resId",
  isTerrainOwner(),
  confirmReservationController
);
//decline a reservation
router.post(
  "/declineReservation/:resId",
  isTerrainOwner(),
  declineReservationController
);

// delete a reservation
router.delete(
  "/deleteReservation/:resId",
  isUser(),
  deleteReservationController
);

module.exports = router;
