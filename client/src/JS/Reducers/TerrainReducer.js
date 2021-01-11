// imports
import {
  GET_TERRAIN,
  FAIL_TERRAIN,
  LOAD_TERRAIN,
  ADD_TERRAIN,
  DELETE_TERRAIN,
  SEARCH_TERR_SUCC,
  SEARCH_TERR_LOAD,
  SEARCH_TERR_FAIL,
  EDIT_TERRAIN_FAIL,
  EDIT_TERRAIN_SUCC,
  EDIT_TERRAIN,
} from "../Constants/TerrainConstants";
// initialise state
const initialState = {
  terrain: [],
  loadTerr: false,
  errors: null,
  searchedTerr: [],
  searchLoad: false,
  searchTerError: null,
  editTerr: false,
  editedTerr: null,
};

export const terrainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_TERRAIN:
      return { ...state, loadTerr: true };
    case ADD_TERRAIN:
      return {
        ...state,
        loadTerr: false,
        terrain: [...state.terrain, payload.terrain],
      };
    case GET_TERRAIN:
      return { ...state, loadTerr: false, terrain: payload };
    case DELETE_TERRAIN:
      return {
        ...state,
        terrain: state.terrain.filter((terr) => terr.id !== payload),
      };
    case FAIL_TERRAIN:
      return { ...state, loadTerr: false, errors: payload };
    case SEARCH_TERR_LOAD:
      return {
        ...state,
        searchLoad: true,
        searchedTerr: [],
        searchTerError: null,
      };
    case SEARCH_TERR_SUCC:
      return {
        ...state,
        searchedTerr: payload,
        searchLoad: false,
        searchTerError: null,
      };
    case SEARCH_TERR_FAIL:
      return {
        ...state,
        searchLoad: false,
        searchTerError: payload,
        searchedTerr: [],
      };
    case EDIT_TERRAIN:
      return { ...state, editTerr: true, editedTerr: payload };
    case EDIT_TERRAIN_SUCC:
      return { ...state, editTerr: false, editedTerr: null };
    case EDIT_TERRAIN_FAIL:
      return { ...state, editTerr: false, editedTerr: null };
    default:
      return state;
  }
};
