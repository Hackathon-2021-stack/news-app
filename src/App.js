import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state={
    Progress:0
  }

  setProgress=(Progress)=>{
    this.setState({
      Progress:Progress
    })
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar
        height={4}
        color='#f11946'
        progress={this.state.Progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Switch>
          <Route exact path='/business'><News setProgress={this.setProgress} key='business' country='in' pageSize={15} category='business' /></Route>
          <Route exact path='/'><News setProgress={this.setProgress} key='home' country='in' pageSize={15} category='general' /></Route>
          <Route exact path='/entertainment'><News setProgress={this.setProgress} key='entertainment' country='in' pageSize={15} category='entertainment' /></Route>
          <Route exact path='/general'><News setProgress={this.setProgress} key='general' country='in' pageSize={15} category='general' /></Route>
          <Route exact path='/health'><News setProgress={this.setProgress} key='health' country='in' pageSize={15} category='health' /></Route>
          <Route exact path='/science'><News setProgress={this.setProgress}  key='science'country='in' pageSize={15} category='science' /></Route>
          <Route exact path='/sports'><News setProgress={this.setProgress} key='sports' country='in' pageSize={15} category='sports' /></Route>
          <Route exact path='/technology'><News setProgress={this.setProgress} key='technology' country='in' pageSize={15} category='technology' /></Route>
        </Switch>
        </Router>
      </div>
    );
  }
}
