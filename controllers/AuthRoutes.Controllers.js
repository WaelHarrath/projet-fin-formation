const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
//register controller

exports.registerController = async (req, res) => {
  const {
    avatar,
    fullName,
    email,
    password,
    confirmationPassword,
    role,
  } = req.body;
  try {
    const newUser = new User({ avatar, fullName, email, password, role });
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ msg: "User Already exists !!" });
    }
    //hashage du password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    newUser.password = hashedPassword;

    await newUser.save();
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
    res.status(500).send({ msg: "can not save the user" });
  }
};

//login controller
exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const searchedUser = await User.findOne({ email });
    if (!searchedUser) {
      return res.status(400).send({ msg: "Bad credentials ,Try again !!" });
    }
    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match) {
      return res.status(400).send({ msg: "Bad credentials ,Try again !!" });
    }
    const payload = {
      _id: searchedUser._id,
      fullName: searchedUser.fullName,
      email: searchedUser.email,
      role: searchedUser.role,
    };
    const token = await jwt.sign(payload, process.env.SecretKey, {
      expiresIn: 3600,
    });
    res
      .status(200)
      .send({ user: searchedUser, token: ` Bearer ${token}`, msg: "success" });
  } catch (error) {
    res.status(500).send({ msg: "can not get the user !!" });
  }
};
//current user controller
exports.currentUserController = async (req, res) => {
  res.status(200).send({ user: req.user });
};

exports.setAvatarController = async (req, res) => {
  const id = req.params.id;
  const image = req.file;

  try {
    let user = await User.findOne({ _id: id });

    if (user) {
      if (image) {
        if (user.avatar != null) {
          fs.unlink("./imageUploads/" + user.avatar, function (err) {
            if (err) return console.log(err);
          });
        }
        user.avatar = image.filename;
        let result = await user.save();

        res.status(200).send({ msg: "Image Updated !!" });
      } else {
        res.status(400).send({ msg: "no image to update !!" });
      }
    } else {
      res.status(400).send({ msg: "no user with this id !!" });
    }
  } catch (error) {
    res.status(500).send({ errors: error, msg: "can't update this image" });
  }
};
