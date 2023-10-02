import React from "react";
// import axios from "axios";
import "./App.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
//
// import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
//
import Feelings from "../Feelings/Feelings";
import Understanding from "../Understanding/Understanding";
import Support from "../Support/Support";
import Comments from "../Comments/Comments";
import Review from "../Review/Review";
import Success from "../Success/Success";

function App() {
  return (
    <Container>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Feedback!</h1>
            <h4>Don't forget it!</h4>
          </header>
          <div className="nav">
            <Link to="/">Feeling</Link>
            <Link to="/understanding">Understanding</Link>
            <Link to="/support">Support</Link>
            <Link to="/comments">Comments</Link>
            <Link to="/review">Review</Link>
          </div>
          <div>
            <Route exact path="/">
              <Feelings />
            </Route>
            <Route path="/understanding">
              <Understanding />
            </Route>
            <Route path="/support">
              <Support />
            </Route>
            <Route path="/comments">
              <Comments />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
            {/* <Route path="/admin">
              <Admin />
            </Route> */}
          </div>
        </div>
      </Router>
      <div className="footer-content">
        <p className="footer">&copy; Kenny Ferguson 2023</p>
      </div>
    </Container>
  );
}

export default App;
