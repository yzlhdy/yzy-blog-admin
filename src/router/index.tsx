import React from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import Layouts from "../components/Layouts/index";

import Login from "../views/Login";

export default function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Layouts}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}
