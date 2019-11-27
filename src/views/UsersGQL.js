import React, { useState, useEffect } from "react";
// useEffect Similaire à componentDidMount et componentDidUpdate
import MaterialTable from "material-table";
//The useSelector is approximately equivalent to the mapStateToProps
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import { editUser } from "../actions/usersactions";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const FEED_QUERY = gql`
  {
    getUsers(orderBy: createdAt_ASC) {
      users {
        name
        email
        createdAt
        description
      }
    }
  }
`;

export default function UsersGQL() {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState({});
  const usersdata = useSelector(state => state.usersdata);
  const cartypes = useSelector(state => state.cartypes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersdata.users) {
      setData(usersdata.users);
    }
  }, [usersdata.users]);

  useEffect(() => {
    if (cartypes.cars) {
      let obj = {};
      cartypes.cars.map(car => (obj[car.name] = car.name));
      setCars(obj);
    }
  }, [cartypes.cars]);

  const columns = [
    { title: "First Name", field: "name" },
    { title: "First Name", field: "lastName" },
    {
      title: "User Type",
      field: "usertype",
      lookup: { rider: "Rider", driver: "Driver", admin: "Admin" }
    },
    { title: "Email", field: "email", editable: "never" },
    { title: "Mobile", field: "mobile" },
    {
      title: "Profile Image",
      field: "profile_image",
      render: rowData =>
        rowData.profile_image ? (
          <img
            alt="Profile"
            src={rowData.profile_image}
            style={{ width: 50, borderRadius: "50%" }}
          />
        ) : null
    },
    { title: "Car Type", field: "carType", lookup: cars },
    { title: "Account Approved", field: "approved", type: "boolean" },
    {
      title: "Driver Active Status",
      field: "driverActiveStatus",
      type: "boolean"
    },
    {
      title: "License Image",
      field: "licenseImage",
      render: rowData =>
        rowData.licenseImage ? (
          <img
            alt="License"
            src={rowData.licenseImage}
            style={{ width: 100 }}
          />
        ) : null
    },
    { title: "Vehicle Model", field: "vehicleModel" },
    { title: "Vehicle Number", field: "vehicleNumber" },
    { title: "Refferal Bonus", field: "refferalBonus", type: "numeric" },
    {
      title: "Signup Via Referral",
      field: "signupViaReferral",
      type: "boolean",
      editable: "never"
    },
    { title: "Refferal Id", field: "refferalId", editable: "never" }
  ];

  const removeExtraKeys = tblData => {
    const obj = {};
    for (let i = 0; i < tblData.length; i++) {
      if (tblData[i].refferalBonus)
        tblData[i].refferalBonus = parseFloat(tblData[i].refferalBonus);
      obj[tblData[i].id] = tblData[i];
      delete obj[tblData[i].id].id;
    }
    return obj;
  };

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <CircularLoading />;
        if (error) return <div>Error</div>;

        const linksToRender = data.getUsers.users;
        return (
          <MaterialTable
            title="All Users"
            columns={columns}
            data={linksToRender}
          />
        );
      }}
    </Query>
  );
}
