import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { editCarType } from "../actions/cartypeactions";

const CAR_TYPES_QUERY = gql`
  {
    getCarType {
      id
      convenience_fees
      image
      name
      rate_per_hour
      rate_per_kilometer
      updatedAt
    }
  }
`;

export default function CarTypes() {
  const columns = [
    {
      title: "Image",
      field: "image",
      render: rowData => (
        <img alt="Car" src={rowData.image} style={{ width: 50 }} />
      )
    },
    { title: "Name", field: "name" },
    {
      title: "Rate Per Kilometer",
      field: "rate_per_kilometer",
      type: "numeric"
    },
    { title: "Rate Per Hour", field: "rate_per_hour", type: "numeric" },
    { title: "Convenience Fees", field: "convenience_fees", type: "numeric" }
  ];
  const [data, setData] = useState([]);
  const cartypes = useSelector(state => state.cartypes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartypes.cars) {
      setData(cartypes.cars);
    }
  }, [cartypes.cars]);

  const removeExtraKeys = tblData => {
    for (let i = 0; i < tblData.length; i++) {
      if (tblData[i].rate_per_kilometer)
        tblData[i].rate_per_kilometer = parseFloat(
          tblData[i].rate_per_kilometer
        );
      if (tblData[i].rate_per_hour)
        tblData[i].rate_per_hour = parseFloat(tblData[i].rate_per_hour);
      if (tblData[i].convenience_fees)
        tblData[i].convenience_fees = parseFloat(tblData[i].convenience_fees);
    }
    return tblData;
  };

  return (
    <Query query={CAR_TYPES_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <CircularLoading />;
        if (error) return <div>Error</div>;

        const cartypes = data.getCarType;
        return (
          <MaterialTable title="CarTypes" columns={columns} data={cartypes} />
        );
      }}
    </Query>
  );
}

// return cartypes.loading ? (
//   <CircularLoading />
// ) : (
//   <MaterialTable
//     title="CarTypes"
//     columns={columns}
//     data={data}
//     editable={{
//       onRowAdd: newData =>
//         new Promise(resolve => {
//           setTimeout(() => {
//             resolve();
//             const tblData = data;
//             tblData.push(newData);
//             dispatch(editCarType(removeExtraKeys(tblData), "Add"));
//           }, 600);
//         }),
//       onRowUpdate: (newData, oldData) =>
//         new Promise(resolve => {
//           setTimeout(() => {
//             resolve();
//             const tblData = data;
//             tblData[tblData.indexOf(oldData)] = newData;
//             dispatch(editCarType(removeExtraKeys(tblData), "Update"));
//           }, 600);
//         }),
//       onRowDelete: oldData =>
//         new Promise(resolve => {
//           setTimeout(() => {
//             resolve();
//             const tblData = data;
//             tblData.splice(tblData.indexOf(oldData), 1);
//             dispatch(editCarType(removeExtraKeys(tblData), "Delete"));
//           }, 600);
//         })
//     }}
//   />
// );
