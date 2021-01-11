console.clear();
//imports
const express = require("express");
const router = express.Router();

const multer = require("multer");

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
});
const {
  registerController,
  loginController,
  currentUserController,
  setAvatarController,
} = require("../controllers/AuthRoutes.Controllers");

const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/AuthValidator");
const isAuth = require("../middleware/AuthPassport");
//routes

//register route
router.post("/register", registerRules(), validation, registerController);

//login route
router.post("/login", loginRules(), validation, loginController);

// get cuurent user
router.get("/current", isAuth(), currentUserController);

// set user avatar
router.post("/userAvatar/:id", upload.single("avatar"), setAvatarController);

module.exports = router;
