import React, { useState } from "react";
import "./MakeReservation.css";
import { useDispatch, useSelector } from "react-redux";
import {makeReservation}from "../../../JS/Actions/ReservationActions"
import { useHistory } from "react-router-dom";
function MakeReservation({location}) {
  const dispatch = useDispatch();
  const history=useHistory();
  const [matchDate, setMatchDate] = useState();
  const user = useSelector((state) => state.userReducer.user);
  const userName  =  user && user.fullName;
  const userEmail  =  user && user.email;
  const userId=user&&user._id;
  console.log(location.state);
 const terrId=location.state._id;
 console.log(terrId)
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
            value={userName}
            readOnly
          />
          <label>
            <strong>Email Adress:</strong>
          </label>
          <input
            type="email"
            name=""
            placeholder="Email Address"
            value={userEmail}
            readOnly
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
            onClick={()=>{dispatch(makeReservation(terrId,userId,matchDate,history))}}
          />
        </form>
      </div>
    </div>
  );
}

export default MakeReservation;
