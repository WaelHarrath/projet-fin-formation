//imports
import {
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FAIL_USER,
  CURRENT_USER,
  CHANGE_AVATAR_SUCC,
  CHANGE_AVATAR_FAIL,
} from "../Constants/UserConstants";
//initialState
const initialState = {
  user: null,
  loadUser: false,
  errors: null,
  isAuth: false,
  avatarDone: false,
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, loadUser: true };
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case REGISTER_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { user: null, loadUser: false, errors: null, isAuth: false };
    case FAIL_USER:
      return { ...state, loadUser: false, errors: payload };
    case CURRENT_USER:
      return { ...state, loadUser: false, isAuth: true, user: payload };
    case CHANGE_AVATAR_SUCC:
      return { ...state, avatarDone: true };
    case CHANGE_AVATAR_FAIL:
      return { ...state, avatarDone: false, errors: payload };
    default:
      return state;
  }
};
