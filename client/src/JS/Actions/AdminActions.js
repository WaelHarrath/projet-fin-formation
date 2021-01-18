import {
  GET_ALL_RESERVATIONS,
  GET_ALL_RESERVATIONS_FAIL,
  LOADING,
  ADD_USER_FAIL,
  ADD_USER,
  DELETE_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  GET_ALL_TERRAINS,
  GET_ALL_TERRAINS_FAIL,
  DELETE_TERRAINS,
  DELETE_TERRAINS_FAIL,
  DELETE_RESERVATIONS,
  DELETE_RESERVATIONS_FAIL,
  GET_ALL_USERS,
  GET_ALL_USERS_FAIL,
  DELETE_USER,
} from "../Constants/AdminConstants";
import axios from "axios";

//reservations actions
//get all reservations
export const getAllReservations = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.get("/admin/allReservations", options);
    dispatch({ type: GET_ALL_RESERVATIONS, payload: result });
  } catch (error) {
    dispatch({ type: GET_ALL_RESERVATIONS_FAIL, payload: error });
  }
};
//delete a reservation

export const deleteReservations = (resId) => async (dispatch) => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.delete(
      `/admin/deleteReservation/${resId}`,
      options
    );
    dispatch({ type: DELETE_RESERVATIONS });
    dispatch(getAllReservations());
  } catch (error) {
    dispatch({ type: DELETE_RESERVATIONS_FAIL, payload: error });
  }
};

//users actions

//get all users
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.get("/admin/allUsers", options);

    dispatch({ type: GET_ALL_USERS, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error });
  }
};

//add a user

export const addUser = (user) => async (dispatch) => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.post("/admin/addUser", user, options);
    dispatch({ type: ADD_USER });
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({ type: ADD_USER_FAIL, payload: error });
  }
};
//update user
export const updateUser = (userId, user) => async (dispatch) => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.post(
      `/admin/updateUser/${userId}`,
      user,
      options
    );
    dispatch({ type: UPDATE_USER });
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error });
  }
};
//delete user
export const deleteUser = (userId) => async (dispatch) => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.delete(`/admin/deleteUser/${userId}`, options);
    dispatch({ type: DELETE_USER });
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error });
  }
};

// terrain actions

//get all terrains
export const getAllTerrains = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.get("/admin/allTerrains", options);
    console.log(result);
    dispatch({ type: GET_ALL_TERRAINS, payload: result });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_TERRAINS_FAIL, payload: error });
  }
};

//delete a terrain

export const deleteTerrains = (terrainId) => async (dispatch) => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const result = await axios.delete(
      `/admin/deleteTerrain/${terrainId}`,
      options
    );
    dispatch({ type: DELETE_TERRAINS });
    dispatch(getAllTerrains());
  } catch (error) {
    dispatch({ type: DELETE_TERRAINS_FAIL, payload: error });
  }
};
