import axios from "axios";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../types/users";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        registerUserLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return { registerUserLoading: false, user: action.payload };
    case REGISTER_USER_FAILURE:
      return { registerUserLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        loginUserLoading: true,
      };
    case LOGIN_USER_SUCCESS:
      return { loginUserLoading: false, user: action.payload };
    case LOGIN_USER_FAILURE:
      return { loginUserLoading: false, error: action.payload };
    default:
      return state;
  }
};
