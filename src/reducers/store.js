import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'

import auth from "./authreducer";
import cartypes from "./cartypesreducer";
import bookingdata from "./bookingsreducer";
import promodata from "./promoreducer";
import usersdata from "./usersreducer";
import referraldata from "./referralreducer";

const reducers = combineReducers({
  auth,
  cartypes,
  bookingdata,
  promodata,
  usersdata,
  referraldata
});

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const store = createStore(reducers, {}, applyMiddleware(...middleware));