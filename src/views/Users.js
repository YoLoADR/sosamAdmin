import React, { useState, useEffect } from "react";
// useEffect Similaire à componentDidMount et componentDidUpdate
import MaterialTable from "material-table";
//The useSelector is approximately equivalent to the mapStateToProps
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import { editUser } from "../actions/usersactions";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const USER_QUERY = gql`
  {
    getUsers(orderBy: createdAt_ASC) {
      users {
        name
        email
        createdAt
        description
        usertype
        isAdmin
        lastName
        firstName
        mobile
        profile_image
        approved
        refferalBonus
        profession
      }
    }
  }
`;

const POST_USER = gql`
  mutation PostUser($name: String!, $email: String!, $password: String!) {
    postUser(
      name: $name
      email: $email
      password: $password
      description: $description
    ) {
      id
    }
  }
`;

export default function Users() {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState({});
  const usersdata = useSelector(state => state.usersdata);
  const cartypes = useSelector(state => state.cartypes);
  const dispatch = useDispatch();
  //const [postUser, { data2 }] = useMutation(ADD_USER);

  useEffect(() => {
    if (usersdata.users) {
      console.log("usersdata", usersdata);
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
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
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

  return (
    <Query query={USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <CircularLoading />;
        if (error) return <div>Error</div>;

        const users = data.getUsers.users;

        console.log("data", users);
        const showObj = Object.keys(users).map(function(key) {
          return <td className="whiteSpaceNoWrap">{users[key]}</td>;
        });
        return (
          <div>
            <showObj />
            <MaterialTable
              title="All Users"
              columns={columns}
              data={users}
              // *********************** TEST PART
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      //const tblData = data;
                      //tblData.push(newData);
                      console.log("newData", newData);
                      //dispatch(editUser(removeExtraKeys(tblData), "Add"));
                    }, 600);
                  }),

                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      console.log("newData", newData);
                      console.log("oldData", oldData);
                      //const tblData = data;
                      //tblData[tblData.indexOf(oldData)] = newData;
                      //dispatch(editUser(removeExtraKeys(tblData), "Update"));
                    }, 600);
                  })
                // *********************** END TEST PART
              }}
            />
          </div>
        );
      }}
    </Query>
  );
}
