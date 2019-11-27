import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { AUTH_TOKEN } from "../config/dev";

function ProtectedRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth);
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <Route
      {...rest}
      render={props =>
        authToken ? (
          <ResponsiveDrawer>
            <Component {...props} />
          </ResponsiveDrawer>
        ) : (
          <Redirect to="/connexion" />
        )
      }
    />
  );
}

export default ProtectedRoute;
