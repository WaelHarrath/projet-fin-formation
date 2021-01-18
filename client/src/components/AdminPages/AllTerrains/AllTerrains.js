import React, { useEffect } from "react";
import "./AllTerrains.css";
import SingleTerrain from "./SingleTerrain";
import { useDispatch, useSelector } from "react-redux";
import { getAllTerrains } from "../../../JS/Actions/AdminActions";
function AllTerrains() {
  const dispatch = useDispatch();
  const terrains = useSelector((state) => state.adminReducer.terrains);
  useEffect(() => {
    dispatch(getAllTerrains());
  }, []);
  return (
    <div className="reservations-container">
      <ul className="reseervation-list">
        {terrains &&
          terrains.map((el) => <SingleTerrain key={el._id} terrain={el} />)}
      </ul>
    </div>
  );
}

export default AllTerrains;
