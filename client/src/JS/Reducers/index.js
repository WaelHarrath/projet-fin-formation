//imports
import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { terrainReducer } from "./TerrainReducer";
//root reducer
export const rootReducer = combineReducers({ userReducer, terrainReducer });
