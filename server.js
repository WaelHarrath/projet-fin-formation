console.clear();
//imports

const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const AuthRoute = require("./routes/AuthRoutes");
const TerrainRoute = require("./routes/TerrainRoutes");
const ReservationRoute = require("./routes/ReservationRoutes");
// initialisation
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
//connection dataBase
dbConnect();
//get images
app.use("/images", express.static("imageUploads"));
// app.use(express.static("imageUploads"));

//test
app.use("/user", AuthRoute);
//authentication

//terrain routes
app.use("/terrain", TerrainRoute);

// reservation routes
app.use("/reservation", ReservationRoute);
app.listen(PORT, (err) => {
  err
    ? console.log("erreur serveur", err)
    : console.log("server is running on port ", PORT);
});
