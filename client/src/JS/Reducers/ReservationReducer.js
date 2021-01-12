import {
  GET_RESERVATION,
  GET_RESERVATION_FAIL,
  GET_RESERVATION_SUCC,
  CREATE_RESERVATION,
  CREATE_RESERVATION_FAIL,
  CREATE_RESERVATION_SUCC,
  CONFIRM_RESERVATION,
  CONFIRM_RESERVATION_FAIL,
  CONFIRM_RESERVATION_SUCC,
  DECLINE_RESERVATION,
  DECLINE_RESERVATION_FAIL,
  DECLINE_RESERVATION_SUCC,
  DELETE_RESERVATION,
  DELETE_RESERVATION_FAIL,
  DELETE_RESERVATION_SUCC,
} from "../Constants/ReservationConstants";

// initializing the state
const initialState = {
  reservations: [],
  getResvLoad: false,
  errors: null,
};

export const reservationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RESERVATION:
      return { ...state, getResvLoad: true };
    case GET_RESERVATION_SUCC:
      return { ...state, reservations: payload, getResvLoad: false };
    case GET_RESERVATION_FAIL:
      return { ...state, getResvLoad: false, errors: payload };
    case CREATE_RESERVATION_FAIL:
      return { ...state, errors: payload };
    case CONFIRM_RESERVATION_FAIL:
      return { ...state, errors: payload };
    case DECLINE_RESERVATION_FAIL:
      return { ...state, errors: payload };

    case DELETE_RESERVATION_FAIL:
      return { ...state, errors: payload };
    default:
      return state;
  }
};
