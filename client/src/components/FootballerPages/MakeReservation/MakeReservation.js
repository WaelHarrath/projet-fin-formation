import React, { useState } from "react";
import "./MakeReservation.css";
import { useDispatch, useSelector } from "react-redux";
function MakeReservation() {
  const dispatch = useDispatch();
  const [matchDate, setMatchDate] = useState("");
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className="make-res-container">
      <div className="res-formBx">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Make a reservation</h2>
          <label>
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            name=""
            placeholder="FullName"
            value={user && user.fullName}
          />
          <label>
            <strong>Email Adress:</strong>
          </label>
          <input
            type="email"
            name=""
            placeholder="Email Address"
            value={user && user.email}
          />
          <label>
            <strong>Match Date:</strong>
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            min="2020-01-01"
            max="2050-12-31"
            onChange={(e) => setMatchDate(e.target.value)}
          />

          <input
            type="submit"
            name=""
            value="Book"
            style={{ background: "#75f336" }}
          />
        </form>
      </div>
    </div>
  );
}

export default MakeReservation;
