import React from "react";
import { useDispatch } from "react-redux";
import { deleteTerrains } from "../../../JS/Actions/AdminActions";
function SingleTerrain({ terrain }) {
  const dispatch = useDispatch();
  return (
    <div className="reservation">
      <div className="reservation-info">
        <ul className="reseervation-list">
          <li className="text">ID</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{terrain._id}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Terrain name</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{terrain.name}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Terrain Adress</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{terrain.address}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Contact Phone</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{terrain.phone}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Status</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{terrain.reserved ? "Reserved" : "Free"}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">Owners Name</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{terrain.owner.fullName}</li>
        </ul>
      </div>
      <button
        className="trash-btn"
        onClick={() => dispatch(deleteTerrains(terrain._id))}
      >
        Delete
      </button>
    </div>
  );
}

export default SingleTerrain;
