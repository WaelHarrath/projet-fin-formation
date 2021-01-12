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
import axios from "axios";

// make a reservation
export const makeReservation = (terrId, userId, matchDate, history) => async (
  dispatch
) => {
  dispatch({ type: CREATE_RESERVATION });
  try {
    const result = await axios.post(
      `/reservation/makeReservation/${terrId}/${userId}`,
      matchDate
    );
    dispatch({ type: CREATE_RESERVATION_SUCC, payload: result.data });
    dispatch(getUserReservations(userId));
    history.push("/myReservations");
  } catch (error) {
    dispatch({ type: CREATE_RESERVATION_FAIL, payload: error });
  }
};
//get user reservations

export const getUserReservations = (userId) => async (dispatch) => {
  dispatch({ type: GET_RESERVATION });
  try {
    const result = await axios.post(`/reservation/userReservations/${userId}`);
    dispatch({ type: GET_RESERVATION_SUCC, payload: result.data.reservations });
  } catch (error) {
    dispatch({ type: GET_RESERVATION_FAIL, payload: error });
  }
};
//get terrain reservations
export const getTerrainReservations = (ownerId) => async (dispatch) => {
  dispatch({ type: GET_RESERVATION });
  try {
    const result = await axios.post(
      `/reservation/terrainReservations/${ownerId}`
    );

    dispatch({
      type: GET_RESERVATION_SUCC,
      payload: result.data.reservations,
    });
  } catch (error) {
    dispatch({ type: GET_RESERVATION_FAIL, payload: error });
  }
};

// confirm reservation
export const confirmReservation = (resId) => async (dispatch) => {
  dispatch({ type: CONFIRM_RESERVATION });
  try {
    const result = await axios.post(`/reservation/confirmReservation/${resId}`);
    dispatch({ type: CONFIRM_RESERVATION_SUCC });
    dispatch(getTerrainReservations(result.data.reservation.terrainOwner));
  } catch (error) {
    dispatch({ type: CONFIRM_RESERVATION_FAIL, payload: error });
  }
};
//decline reservation
export const declineReservation = (resId) => async (dispatch) => {
  dispatch({ type: DECLINE_RESERVATION });
  try {
    const result = await axios.post(`/reservation/declineReservation/${resId}`);
    dispatch({ type: DECLINE_RESERVATION_SUCC });
    dispatch(getTerrainReservations(result.data.reservation.terrainOwner));
  } catch (error) {
    dispatch({ type: DECLINE_RESERVATION_FAIL, payload: error });
  }
};
//delete reservation
export const deleteReservation = (resId) => async (dispatch) => {
  dispatch({ type: DELETE_RESERVATION });
  try {
    const result = await axios.delete(
      `/reservation/deleteReservation/${resId}`
    );
    dispatch({ type: DELETE_RESERVATION_SUCC });
    dispatch(getUserReservations(result.data.reservation.user));
  } catch (error) {
    dispatch({ type: DELETE_RESERVATION_FAIL, payload: error });
  }
};
