import { userRef } from "../config/firebase";
import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILED,
  EDIT_ALL_USERS
} from "./types";

export const fetchUsers = () => dispatch => {
  dispatch({
    type: FETCH_ALL_USERS,
    payload: null
  });
  userRef.on("value", snapshot => {
    if (snapshot.val()) {
      const data = snapshot.val();
      const arr = Object.keys(data).map(i => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: FETCH_ALL_USERS_SUCCESS,
        payload: arr
      });
    } else {
      dispatch({
        type: FETCH_ALL_USERS_FAILED,
        payload: "No users available."
      });
    }
  });
};

export const editUser = (users, method) => dispatch => {
  dispatch({
    type: EDIT_ALL_USERS,
    payload: method
  });
  userRef.set(users);
};
