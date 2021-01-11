import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthToken = localStorage.getItem("token");
  if (isAuthToken) {
    return <Route component={Component} {...rest} />;
  } else {
    return <Redirect to="/" />;
  }
}

export default PrivateRoute;
