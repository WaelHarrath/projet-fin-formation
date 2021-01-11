import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTerrains } from "../../../JS/Actions/TerrainActions";
import TerrainCard from "../../TerrainCard/TerrainCard";
import "./MyTerrains.css";
function MyTerrains() {
  const User = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const userRole = User && User.role;
  const userId = User && User._id;
  useEffect(() => {
    if (User) {
      dispatch(getTerrains(User._id));
    }
  }, [User]);
  const terrains = useSelector((state) => state.terrainReducer.terrain);
  if (terrains && terrains.length === 0) {
    return (
      <div className="owner-terrain-container">
        <h2>No terrains To show you !!</h2>
      </div>
    );
  }

  return (
    <div className="owner-terrain-container">
      {terrains &&
        terrains.map((el, i) => (
          <TerrainCard key={i} terrain={el} userId={userId} role={userRole} />
        ))}
    </div>
  );
}

export default MyTerrains;
