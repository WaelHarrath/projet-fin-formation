import React from "react";
import { useDispatch } from "react-redux";
import { deleteReservations } from "../../../JS/Actions/AdminActions";
function SingleReservation({ reservation }) {
  const dispatch = useDispatch();
  return (
    <div className="reservation">
      <div className="reservation-info">
        <ul className="reseervation-list">
          <li className="text">ID</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{reservation._id}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Terrain name</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{reservation.terrain.name}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">User name</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{reservation.user.fullName}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Match Date</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{reservation.matchDate}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Status</li>
          <hr style={{ width: "100%" }} />
          <li className="text">
            {reservation.pending === true && reservation.confirmed === false
              ? "Pending ..."
              : reservation.pending === false && reservation.confirmed === false
              ? "Declined"
              : "Confirmed"}
          </li>
        </ul>
      </div>
      <button
        className="trash-btn"
        onClick={() => dispatch(deleteReservations(reservation._id))}
      >
        Delete
      </button>
    </div>
  );
}

export default SingleReservation;
