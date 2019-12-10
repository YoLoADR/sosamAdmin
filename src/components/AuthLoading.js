import React,{ useEffect } from 'react';
import CircularLoading from "./CircularLoading";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarTypes } from "../actions/cartypeactions";
import { fetchBookings } from "../actions/bookingactions";
import { fetchPromos } from "../actions/promoactions";
import { fetchUsers } from "../actions/usersactions";
import { fetchBonus } from "../actions/referralactions";

function AuthLoading(props) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);    
    useEffect(()=>{
        if(auth.info){
            dispatch(fetchUsers());
            dispatch(fetchBookings());
            dispatch(fetchCarTypes());
            dispatch(fetchPromos());
            dispatch(fetchBonus());
        }

    },[auth.info,dispatch]);

    return (
        auth.loading? <CircularLoading/>:props.children
    )
}

export default AuthLoading;