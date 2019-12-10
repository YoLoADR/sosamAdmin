import {
  FETCH_BOOKINGS,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILED,
  EDIT_BOOKINGS,
  UPDATE_BOOKING_RECORD,
  UPDATE_BOOKING_RECORD_SUCCESS,
  UPDATE_BOOKING_RECORD_FAILURE
} from "../actions/types";

export const INITIAL_STATE = {
  bookings: [],
  loading: false,
  error: {
    flag: false,
    msg: null
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return {
        ...state,
        loading: true
      };

    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
        loading: false
      };

    case FETCH_BOOKINGS_FAILED:
      return {
        ...state,
        bookings: null,
        loading: false,
        error: {
          flag: true,
          msg: action.payload
        }
      };

    case UPDATE_BOOKING_RECORD:
      return {
        ...state,
        loading: true
      };

    case UPDATE_BOOKING_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_BOOKING_RECORD_FAILURE:
      return {
        ...state,
        loading: false
      };

    case EDIT_BOOKINGS:
      return state;
    default:
      return state;
  }
};