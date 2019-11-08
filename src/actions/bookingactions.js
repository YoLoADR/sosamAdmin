import { bookingRef } from "../config/firebase";
import { 
    FETCH_BOOKINGS,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILED,
    EDIT_BOOKINGS
} from "./types";

export const fetchBookings = () => dispatch => {
    dispatch({
      type: FETCH_BOOKINGS,
      payload: null
    });
    bookingRef.on("value", snapshot => {
      if (snapshot.val()) {
        const data = snapshot.val();
        const arr = Object.keys(data).map(i => {
          data[i].id = i
          data[i].pickupAddress =  data[i].pickup.add;
          data[i].dropAddress =  data[i].drop.add;
          data[i].discount =  data[i].discount_amount?data[i].discount_amount:0;
          return data[i]
        });
        dispatch({
          type: FETCH_BOOKINGS_SUCCESS,
          payload: arr
        });
      } else {
        dispatch({
          type: FETCH_BOOKINGS_FAILED,
          payload: "No bookings available."
        });
      }
    });
  };

  export const editBooking = (bookings,method) => dispatch =>{
    dispatch({
      type: EDIT_BOOKINGS,
      payload: method
    });
    bookingRef.set(bookings);
  }