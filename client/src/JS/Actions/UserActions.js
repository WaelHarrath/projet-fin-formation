//importations des constants
import {
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FAIL_USER,
  CURRENT_USER,
  CHANGE_AVATAR,
  CHANGE_AVATAR_FAIL,
  CHANGE_AVATAR_SUCC,
} from "../Constants/UserConstants";
import axios from "axios";

//register user action function
export const registerUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("/user/register", user); //{user,msg,token}
    dispatch({ type: REGISTER_USER, payload: result.data });
    history.push("/profile");
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    } else {
      alert(msg);
    }
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
//login user action function
export const loginUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("/user/login", user); //{user,msg,token}
    dispatch({ type: LOGIN_USER, payload: result.data });
    history.push("/profile");
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};
//get current user
export const currentUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get("/user/current", options); //user
    dispatch({ type: CURRENT_USER, payload: result.data.user });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

//change user avatar
export const changeAvatar = (id, data, history) => async (dispatch) => {
  dispatch({ type: CHANGE_AVATAR });
  try {
    let result = await axios.post(`/user/userAvatar/${id}`, data);
    dispatch({ type: CHANGE_AVATAR_SUCC, payload: result.data });
    dispatch(currentUser());
    history.push("/profile");
  } catch (error) {
    dispatch({ type: CHANGE_AVATAR_FAIL, payload: error.response.data });
  }
};

//logout user
export const logOutUser = () => {
  return { type: LOGOUT_USER };
};
