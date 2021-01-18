//imports
import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { terrainReducer } from "./TerrainReducer";
import { reservationReducer } from "./ReservationReducer";
import { adminReducer } from "./AdminReducer";
//root reducer
export const rootReducer = combineReducers({
  userReducer,
  terrainReducer,
  reservationReducer,
  adminReducer,
});
