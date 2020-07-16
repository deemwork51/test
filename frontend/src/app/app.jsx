import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import routeOptions from "../routes/route";
import "./index.scss";
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    
    const uri = window.location.pathname;
    let routes = routeOptions.routes.map(({ path, component, exact }, i) => (
      <Route
        key={Math.random() + "ROUTE_"}
        exact={exact}
        path={path}
        component={component}
      />
    ));


    return (
      <div className="App">
      

          <div>
            <Switch>
              {routes}
             
            </Switch>
          </div>
        </div>
      
    );
  }
}


