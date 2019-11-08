import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import CircularLoading from "../components/CircularLoading";
//import { useSelector,useDispatch } from "react-redux";
import { useSelector } from "react-redux";

/*
import {
    editBooking
  }  from "../actions/bookingactions";
*/

export default function Bookings() {
    const columns =  [
        { title: 'Booking Date', field: 'tripdate' },
        { title: 'Trip start Time', field: 'trip_start_time' },
        { title: 'Trip End Time', field: 'trip_end_time' },
        { title: 'Customer',field: 'customer_name'},
        { title: 'Car Type', field: 'carType' },
        { title: 'Vehicle Number', field: 'vehicle_number' },  
        { title: 'Pickup Address', field: 'pickupAddress' },
        { title: 'Drop Address', field: 'dropAddress' },
        { title: 'Assign Driver', field: 'driver_name' },
        { title: 'Booking Status', field: 'status' },
        { title: 'Trip cost', field: 'trip_cost' },
        { title: 'Discount Amount', field: 'discount'},
        { title: 'Payment Status', field: 'payment_status'},
        ];

  const [data, setData] = useState([]);
  const bookingdata = useSelector(state => state.bookingdata);
  //const dispatch = useDispatch();

  useEffect(()=>{
        if(bookingdata.bookings){
            setData(bookingdata.bookings);
        }
  },[bookingdata.bookings]);

  /*
  const removeExtraKeys = (tblData) =>{
    const obj = {};
    for(let i = 0;i<tblData.length;i++){
        obj[tblData[i].id] = tblData[i];
        delete obj[tblData[i].id].pickupAddress;
        delete obj[tblData[i].id].dropAddress;
        delete obj[tblData[i].id].id;
    }
    return obj;
  }*/

  return (
    bookingdata.loading? <CircularLoading/>:
    <MaterialTable
      title="Bookings"
      columns={columns}
      data={data}
      editable={{

      /* You can Open these below to enable Add / Edit/ Delete */
      
 /*     onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData.push(newData);
              dispatch(editBooking(removeExtraKeys(tblData),"Add"));
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData[tblData.indexOf(oldData)] = newData;
              dispatch(editBooking(removeExtraKeys(tblData),"Update"));
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData.splice(tblData.indexOf(oldData), 1);
              dispatch(editBooking(removeExtraKeys(tblData),"Delete"));
            }, 600);
          }), */
      }}
    />
  );
}
