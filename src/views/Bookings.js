import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import CircularLoading from "../components/CircularLoading";
//import { useSelector,useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { AUTH_TOKEN } from "../config/dev"; // (4)
import { Mutation } from "react-apollo";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

/*
import {
    editBooking
  }  from "../actions/bookingactions";
*/

const BOOKING_QUERY = gql`
  {
    getBookings(orderBy: createdAt_ASC) {
      bookings {
        id
        customer_name
        carType
        tripdate
        trip_start_time
        trip_end_time
        vehicle_number
        driver_number
        passenger_number
        kilometer_number
        hour_number
        day_number
        pickupAddress
        pickupCity
        dropAddress
        dropCity
        driver_name
        status
        discount
        trip_cost
        payment_status
      }
    }
  }
`;

const POST_BOOKING = gql`
  mutation PostBooking($carType: String!, $customer_name: String!) {
    postUser(carType: $carType, customer_name: $customer_name) {
      url
      description
    }
  }
`;

export default function Bookings() {
  const columns = [
    { title: "Booking Date", field: "tripdate" },
    { title: "Trip start Time", field: "trip_start_time" },
    { title: "Trip End Time", field: "trip_end_time" },
    { title: "Customer", field: "customer_name" },
    { title: "Car Type", field: "carType" },
    { title: "Vehicle Number", field: "vehicle_number" },
    { title: "Pickup Address", field: "pickupAddress" },
    { title: "Drop Address", field: "dropAddress" },
    { title: "Assign Driver", field: "driver_name" },
    { title: "Booking Status", field: "status" },
    { title: "Trip cost", field: "trip_cost" },
    { title: "Discount Amount", field: "discount" },
    { title: "Payment Status", field: "payment_status" }
  ];

  const [data, setData] = useState([]);
  const bookingdata = useSelector(state => state.bookingdata);

  const history = useHistory();
  const _confirm = async data => {
    console.log("*******TRIGGER");
    const { token } = data.login;
    _saveUserData(token);
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
    history.push(`/users`);
  };
  //const dispatch = useDispatch();

  useEffect(() => {
    if (bookingdata.bookings) {
      setData(bookingdata.bookings);
    }
  }, [bookingdata.bookings]);

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
    <Query query={BOOKING_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <CircularLoading />;
        if (error) return <div>Error</div>;

        const bookings = data.getBookings.bookings;
        return (
          <MaterialTable
            title="Bookings"
            columns={columns}
            data={bookings}
            editable={{
              // *********************** TEST PART
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {}, 600);
                }),

              onRowUpdate: (newData, oldData) => {
                let carType = newData.carType;
                let customer_name = newData.customer_name;
                return (
                  <Mutation
                    mutation={POST_BOOKING}
                    variables={{ carType, customer_name }}
                    onCompleted={data => _confirm(data)}
                  >
                    {mutation => _confirm()}
                  </Mutation>
                );
              }
              // *********************** END TEST PART
            }}
          />
        );
      }}
    </Query>
  );
}
