import axios from "axios";
import { object } from "yup";
import Authentication from "../../Components/Authentication/Authentication";
import { API_BASE_URL } from "../../config/api";
import { api } from "../../config/api";

import {
  EMAIL_RESET_FAILURE,
  EMAIL_RESET_SUCCESS,
  FIND_USER_BY_ID_FAILURE,
  FIND_USER_BY_ID_SUCCESS,
  // FIND_USER_BY_ID_PROFILE_FAILURE,
  // FIND_USER_BY_ID_PROFILE_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("logedin user ", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
    return data;
  } catch (error) {
    console.log(error);
    const obj = error.response.data.status;
    const lst_error = {};
    if (obj === 403) {
      lst_error["AccessDenied"] = "Invalid username or password";
    }
    if (obj === 500) {
      lst_error["UserNotFound"] =
        "Username not found with email " + loginData.email;
    }
    dispatch({ type: LOGIN_USER_FAILURE, payload: lst_error });
    throw lst_error;
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    console.log("singup user ", data);

    // if (data.jwt) {
    //   localStorage.setItem("jwt", data.jwt);
    // }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
    return data;
  } catch (error) {
    const obj = error.response.data.data;
    const lst_error = {};
    if (obj !== undefined) {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        lst_error[key] = value;
      });
    } else {
      lst_error["isExistsEmail"] = error.response.data.message;
      console.log(lst_error);
    }
    dispatch({ type: REGISTER_USER_FAILURE, payload: lst_error });
    throw lst_error;
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    console.log("find uer by id", data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData);
    console.log("updated user  ", data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    console.log("followed user  ", data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};

export const emailReset = (email) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/password-reset-request`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: EMAIL_RESET_SUCCESS, payload: data });
    return data
  } catch (error) {
    console.log("error", error);
    const lst_error = {};
    if(error.response.data.status===405){
      lst_error["NotCreate"] = error.response.data.message;
      console.log(lst_error) 
    }
    dispatch({ type: EMAIL_RESET_FAILURE, payload: error.message });
    throw lst_error
  }
};

export const resetPassword = (values) => async (dispatch) => {
  const token = encodeURIComponent(values.tokenValidate);
  try {
    console.log(values);
    const params = {
      token: token
    };
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/reset-password`,
      { 
        newPassword: values.newPassword
       },
      {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("email reset ", data);
    <Authentication></Authentication>
    dispatch({ type: EMAIL_RESET_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const lst_error={}
    if(error.response.data.status===405){
      lst_error["Invalid"] = error.response.data.message;
      console.log(lst_error) 
    }
    dispatch({ type: EMAIL_RESET_FAILURE, payload: error.message });
    throw lst_error
  }
};

