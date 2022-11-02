import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../pages/Landing";

function AppRouter(props) {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </Fragment>
  );
}

export default AppRouter;
