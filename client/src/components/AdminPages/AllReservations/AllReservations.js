import React, { useEffect } from "react";
import "./AllReservations.css";
import { useDispatch, useSelector } from "react-redux";
import SingleReservation from "./SingleReservation";
import { getAllReservations } from "../../../JS/Actions/AdminActions";
function AllReservations() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.adminReducer.reservations);
  useEffect(() => {
    dispatch(getAllReservations());
  }, []);
  return (
    <div className="reservations-container">
      <ul className="reseervation-list">
        {reservations &&
          reservations.map((el) => (
            <SingleReservation key={el._id} reservation={el} />
          ))}
      </ul>
    </div>
  );
}

export default AllReservations;
