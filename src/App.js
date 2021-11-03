import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [Prog, setProg] = useState(0);

  const setProgress = (Progress) => {
    setProg(Progress);
  };

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={4}
          color="#f11946"
          progress={Prog}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <Route exact path="/business">
            <News
              setProgress={setProgress}
              key="business"
              country="in"
              pageSize={15}
              category="business"
            />
          </Route>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              key="home"
              country="in"
              pageSize={15}
              category="general"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              key="entertainment"
              country="in"
              pageSize={15}
              category="entertainment"
            />
          </Route>
          <Route exact path="/general">
            <News
              setProgress={setProgress}
              key="general"
              country="in"
              pageSize={15}
              category="general"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setProgress}
              key="health"
              country="in"
              pageSize={15}
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setProgress}
              key="science"
              country="in"
              pageSize={15}
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              key="sports"
              country="in"
              pageSize={15}
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setProgress}
              key="technology"
              country="in"
              pageSize={15}
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
