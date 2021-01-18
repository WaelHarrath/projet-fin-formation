import {
  GET_ALL_RESERVATIONS,
  GET_ALL_RESERVATIONS_FAIL,
  LOADING,
  ADD_USER_FAIL,
  DELETE_USER_FAIL,
  UPDATE_USER_FAIL,
  GET_ALL_TERRAINS,
  GET_ALL_TERRAINS_FAIL,
  DELETE_TERRAINS_FAIL,
  DELETE_RESERVATIONS_FAIL,
  GET_ALL_USERS,
  GET_ALL_USERS_FAIL,
} from "../Constants/AdminConstants";
// initializing the state
const initialState = {
  reservations: [],
  terrains: [],
  users: [],
  loading: false,
  errors: null,
};

export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESERVATIONS:
      return { ...state, reservations: payload.reservations, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case GET_ALL_RESERVATIONS_FAIL:
      return { ...state, loading: false, errors: payload.errors };
    case ADD_USER_FAIL:
      return { ...state, errors: payload.errors };
    case DELETE_USER_FAIL:
      return { ...state, errors: payload.errors };
    case UPDATE_USER_FAIL:
      return { ...state, errors: payload.errors };

    case GET_ALL_TERRAINS:
      return { ...state, terrains: payload.terrains, loading: false };
    case GET_ALL_TERRAINS_FAIL:
      return { ...state, terrains: payload.terrains, loading: false };
    case DELETE_TERRAINS_FAIL:
      return { ...state, errors: payload.errors };
    case DELETE_RESERVATIONS_FAIL:
      return { ...state, errors: payload.errors };
    case GET_ALL_USERS:
      return { ...state, users: payload.users, loading: false };
    case GET_ALL_USERS_FAIL:
      return { ...state, errors: payload.errors, loading: false };
    default:
      return state;
  }
};
