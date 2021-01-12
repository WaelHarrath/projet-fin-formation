import React, { useEffect } from "react";
import "./ReservationDemandes.css";
import { useDispatch, useSelector } from "react-redux";
import ReservationCard from "../../ReservationCard/ReservationCard";
import { getTerrainReservations } from "../../../JS/Actions/ReservationActions";
function ReservationDemandes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = user && user._id;
  const role = user && user.role;
  const reservations = useSelector(
    (state) => state.reservationReducer.reservations
  );
  useEffect(() => {
    if (user) {
      dispatch(getTerrainReservations(user._id));
    }
  }, [user]);
  return (
    <div className="reservations-container">
      {reservations &&
        reservations.map((el, i) => (
          <ReservationCard
            key={el._id}
            reservation={el}
            role={role}
            user={userId}
          />
        ))}
    </div>
  );
}

export default ReservationDemandes;
