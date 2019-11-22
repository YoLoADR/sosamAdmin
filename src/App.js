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
import LinkList from "./views/LinkList";
import CreateLink from "./views/CreateLink";
import Header from "./views/Header";
import { fetchUser } from "./actions/authactions";
import AuthLoading from "./components/AuthLoading";

function App() {
  store.dispatch(fetchUser());
  return (
    <Provider store={store}>
      <AuthLoading>
        <Router>
          <Header />
          <Switch>
            <ProtectedRoute exact component={Dashboard} path="/" />
            <ProtectedRoute exact component={CarTypes} path="/cartypes" />
            <ProtectedRoute exact component={Bookings} path="/bookings" />
            <ProtectedRoute exact component={Promos} path="/promos" />
            <ProtectedRoute exact component={Users} path="/drivers" />
            <ProtectedRoute exact component={Referral} path="/referral" />
            <Route component={Article} path="/Article" />
            <Route component={SignUp} path="/signUp" />
            <Route component={Login} path="/login" />
            <Route exact path="/link-list" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
          </Switch>
        </Router>
      </AuthLoading>
    </Provider>
  );
}

export default App;
