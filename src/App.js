import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import CarTypes from "./views/CarTypes";
import Bookings from "./views/Bookings";
import Promos from "./views/Promos";
import Users from "./views/Users";
import Referral from "./views/Referral";
import Article from "./views/Article";
import CreateLink from "./views/CreateLink";
import Header from "./views/Header";
import { fetchUser } from "./actions/authactions";
import AuthLoading from "./components/AuthLoading";
import Connexion from "./views/Connexion";
import UsersGQL from "./views/UsersGQL";
import Inscription from "./views/Inscription";

function App() {
  //store.dispatch(fetchUser());
  return (
    <Provider store={store}>
      <AuthLoading>
        <Router>
          <Switch>
            <ProtectedRoute exact component={Dashboard} path="/" />
            <ProtectedRoute exact component={CarTypes} path="/cartypes" />
            <ProtectedRoute exact component={Bookings} path="/bookings" />
            <ProtectedRoute exact component={Promos} path="/promos" />
            <ProtectedRoute exact component={Users} path="/drivers" />
            <ProtectedRoute exact component={Referral} path="/referral" />
            <ProtectedRoute exact component={UsersGQL} path="/users" />
            <Route component={Article} path="/Article" />
            <Route component={SignUp} path="/signUp" />
            <Route component={Login} path="/login" />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/connexion" component={Connexion} />
            <Route exact path="/inscription" component={Inscription} />
          </Switch>
        </Router>
      </AuthLoading>
    </Provider>
  );
}

export default App;
