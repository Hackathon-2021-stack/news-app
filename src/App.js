import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar />

        <Switch>
          <Route exact path='/business'><News key='business' country='in' pageSize={9} category='business' /></Route>
          <Route exact path='/'><News key='home' country='in' pageSize={9} category='general' /></Route>
          <Route exact path='/entertainment'><News key='entertainment' country='in' pageSize={9} category='entertainment' /></Route>
          <Route exact path='/general'><News key='general' country='in' pageSize={9} category='general' /></Route>
          <Route exact path='/health'><News key='health' country='in' pageSize={9} category='health' /></Route>
          <Route exact path='/science'><News  key='science'country='in' pageSize={9} category='science' /></Route>
          <Route exact path='/sports'><News key='sports' country='in' pageSize={9} category='sports' /></Route>
          <Route exact path='/technology'><News key='technology' country='in' pageSize={9} category='technology' /></Route>
        </Switch>
        </Router>
      </div>
    );
  }
}
