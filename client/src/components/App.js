import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./Landing";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import * as actions from "../actions";

import SurveyNew from './surveys/SurveyNew';


class App extends Component {
  componentDidMount() {
    //fecth data from compononent use props
    //start an action to fetchuser id when booting
    this.props.fetchUser();
  }

  render() {
    return (
      //implementing routers
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/" component={SurveyNew}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
