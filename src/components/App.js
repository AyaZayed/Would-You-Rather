import React, { Component, Fragment } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import NavBar from "./NavBar";
import NewQuestion from "./NewQuestion";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import Layout from "./Layout";
import QuestionDetails from "./QuestionDetails";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {authedUser !== null ? (
            <Layout>
              <NavBar />
              <Route path="/" exact component={Home}></Route>
              <Route path="/add" component={NewQuestion}></Route>
              <Route path="/notfound" component={NotFound}></Route>
              <Route path="/leaderboard" component={LeaderBoard}></Route>
              <Route path="/questions/:id" component={QuestionDetails}></Route>
            </Layout>
          ) : (
            <Login />
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
