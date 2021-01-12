import React from "react";
import "./ReservationCard.css";
import { Carousel, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Moment from "moment";

import {
  confirmReservation,
  deleteReservation,
  declineReservation,
} from "../../JS/Actions/ReservationActions";
function ReservationCard({ reservation, role, userId }) {
  const dispatch = useDispatch();
  let imgs = [];
  const terrain = reservation.terrain;
  const user = reservation.user;
  terrain.terrainImages.map((el) => imgs.push(el));

  return (
    <div className="res-card">
      <div className="row ">
        <div className="col-md-7 px-3">
          <div className="card-block px-6">
            <h4 className="card-title">Reservation n°{reservation._id}</h4>
            <div
              className="info-container"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p className="card-text">Terrain Adresse:</p>
              <p>{terrain.address}</p>
            </div>

            <div
              className="info-container"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p className="card-text">User Name:</p>
              <p>{user.fullName}</p>
            </div>
            <div
              className="info-container"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p className="card-text">Match date:</p>
              <p>{Moment(reservation.matchDate).format("DD-MM-YYYY")}</p>
            </div>

            <div
              className="info-container"
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <p className="card-text">Status:</p>
              <p>
                {reservation.pending === true && reservation.confirmed === false
                  ? "Pending ..."
                  : reservation.pending === false &&
                    reservation.confirmed === false
                  ? "Declined"
                  : "Confirmed"}
              </p>
            </div>
            {role === "footBaller" ? (
              <div
                className="btn-container"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(deleteReservation(reservation._id));
                  }}
                >
                  Delete Reservation
                </Button>
              </div>
            ) : role === "terrainOwner" &&
              reservation.pending === true &&
              reservation.confirmed === false ? (
              <div
                className="btn-container"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  variant="success"
                  onClick={() => {
                    dispatch(confirmReservation(reservation._id));
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(declineReservation(reservation._id));
                  }}
                >
                  Decline
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-md-5" style={{ height: "100%" }}>
          {" "}
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.REACT_APP_IMG_URL + imgs[0]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.REACT_APP_IMG_URL + imgs[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.REACT_APP_IMG_URL + imgs[2]}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
