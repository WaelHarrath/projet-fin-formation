const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdminPassport");
const {
  getAllUserController,
  addUserController,
  deleteUserController,
  updateUserController,
  getAllTerrainController,
  deleteTerrainController,
  getAllReservationsController,
  deleteReservationController,
} = require("../controllers/AdminRoutes.Controllers");
//Users Section
//get all users
router.get("/allUsers", isAdmin(), getAllUserController);
//add a user
router.post("/addUser", isAdmin(), addUserController);
// update a user
router.post("/updateUser/:userId", isAdmin(), updateUserController);
// delete a user
router.delete("/deleteUser/:userId", isAdmin(), deleteUserController);

//Terrain section
//get all terrains
router.get("/allTerrains", isAdmin(), getAllTerrainController);
//delete Terrain
router.delete("/deleteTerrain/:terrainId", isAdmin(), deleteTerrainController);

//reservation section
//get all reservations
router.get("/allReservations", isAdmin(), getAllReservationsController);
//delete reservation
router.delete(
  "/deleteReservation/:resId",
  isAdmin(),
  deleteReservationController
);
module.exports = router;
