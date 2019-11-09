import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import DashboardCard from "../components/DashboardCard";
import Map from "../components/Map";
import { useSelector } from "react-redux";
import CircularLoading from "../components/CircularLoading";

const Dashboard = () => {
  const [mylocation, setMylocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [dailygross, setDailygross] = useState(0);
  const [monthlygross, setMonthlygross] = useState(0);
  const [totalgross, setTotalgross] = useState(0);
  const usersdata = useSelector(state => state.usersdata);
  const bookingdata = useSelector(state => state.bookingdata);

  useEffect(() => {
    if (mylocation == null) {
      navigator.geolocation.getCurrentPosition(
        position =>
          setMylocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }),
        err => console.log(err)
      );
    }
  }, [mylocation]);

  useEffect(() => {
    if (usersdata.users) {
      const drivers = usersdata.users.filter(
        ({ usertype }) => usertype === "driver"
      );
      let locs = [];
      for (let i = 0; i < drivers.length; i++) {
        if (
          drivers[i].approved &&
          drivers[i].driverActiveStatus &&
          drivers[i].location
        ) {
          locs.push({
            id: i,
            lat: drivers[i].location.lat,
            lng: drivers[i].location.lng,
            drivername: drivers[i].firstName + " " + drivers[i].lastName
          });
        }
      }
      setLocations(locs);
    }
  }, [usersdata.users]);

  useEffect(() => {
    if (bookingdata.bookings) {
      let today = new Date();
      let tdTrans = 0;
      let mnTrans = 0;
      let totTrans = 0;
      for (let i = 0; i < bookingdata.bookings.length; i++) {
        const { trip_cost, discount_amount, tripdate } = bookingdata.bookings[
          i
        ];
        let tDate = new Date(tripdate);
        if (trip_cost >= 0 && discount_amount >= 0) {
          if (
            tDate.getDate() === today.getDate() &&
            tDate.getMonth() === today.getMonth()
          ) {
            tdTrans = tdTrans + trip_cost + discount_amount;
          }
          if (
            tDate.getMonth() === today.getMonth() &&
            tDate.getFullYear() === today.getFullYear()
          ) {
            mnTrans = mnTrans + trip_cost + discount_amount;
          }
          totTrans = totTrans + trip_cost + discount_amount;
        }
      }
      setDailygross(tdTrans.toFixed(2));
      setMonthlygross(mnTrans.toFixed(2));
      setTotalgross(totTrans.toFixed(2));
    }
  }, [bookingdata.bookings]);

  return bookingdata.loading || usersdata.loading ? (
    <CircularLoading />
  ) : (
    <div>
      <Grid container direction="row" spacing={2}>
        <Grid item xs>
          <DashboardCard title="Today" image={require("../assets/money4.png")}>
            {"$ " + dailygross}
          </DashboardCard>
        </Grid>
        <Grid item xs>
          <DashboardCard
            title="This Month"
            image={require("../assets/money5.png")}
          >
            {"$ " + monthlygross}
          </DashboardCard>
        </Grid>
        <Grid item xs>
          <DashboardCard title="Total" image={require("../assets/money6.png")}>
            {"$ " + totalgross}
          </DashboardCard>
        </Grid>
      </Grid>
      {mylocation ? (
        <Paper style={{ marginTop: "25px" }}>
          <Typography variant="h4" style={{ margin: "20px 0 0 15px" }}>
            Drivers Realtime
          </Typography>
          <Map
            mapcenter={mylocation}
            locations={locations}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3dAC_Avi4Qljvqfd9mBT7sNJorHjEZ5U&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `480px` }} />}
            containerElement={<div style={{ height: `480px` }} />}
            mapElement={<div style={{ height: `480px` }} />}
          />
        </Paper>
      ) : (
        <Typography
          variant="h4"
          style={{ margin: "20px 0 0 15px", color: "#FF0000" }}
        >
          Allow Location for the Realtime Map
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
