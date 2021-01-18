console.clear();
//imports
const multer = require("multer");
const isTerrainOwner = require("../middleware/isTerrainOwner");
const isUser = require("../middleware/isUser");
//initialisation multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imageUploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});
//initialisation express
const express = require("express");
const router = express.Router();
//import controllers
const {
  createTerrainController,
  allUserTerrainsController,
  deleteTerrainController,
  searchTerrainController,
  updateTerrainController,
  findTerrainByIdController,
} = require("../controllers/TerrainRoutes.Controllers");
const { terrainRules, validation } = require("../middleware/TerrainValidator");

//add a new terrain
router.post(
  "/:userId/createTerrain",
  isTerrainOwner(),
  upload.array("terrainImages", 3),
  terrainRules(),
  validation,
  createTerrainController
);
// find all terrains of user
router.get("/:userId/myTerrains", isTerrainOwner(), allUserTerrainsController);

// search a terrain by adress
router.post("/searchTerrains", isUser(), searchTerrainController);
// update a terrain
router.post(
  "/updateTerrain/:terrainId",
  isTerrainOwner(),
  upload.array("terrainImages", 3),
  updateTerrainController
);
//find a terrain by id
router.get(
  "/findTerr/:userId/:terrainId",
  isTerrainOwner(),
  findTerrainByIdController
);

// delete a terrain
// remove a terrain by id
router.delete(
  "/:userId/myTerrains/:terrainId",
  isTerrainOwner(),
  deleteTerrainController
);

module.exports = router;
