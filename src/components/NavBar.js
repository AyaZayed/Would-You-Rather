import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUserActions";
import { Nav, Navbar, Button, Image } from "react-bootstrap";

export class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar bg="light" expand="lg" className="mb-4">
          <Navbar.Brand href="/" style={{ marginLeft: "25px" }}>
            Would You Rather
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/leaderboard">
                LeaderBoard
              </Nav.Link>
              <Nav.Link as={Link} to="/add">
                New Question
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Navbar.Text style={{ marginRight: "10px" }}>
              <b>Hello, </b>
              {user.name}{" "}
              <Image
                src={`${user.avatarURL}`}
                alt={`${user.name} avatar`}
                roundedCircle
                style={{ width: 35, height: 35, marginRight: "20px" }}
              ></Image>
            </Navbar.Text>
            <Nav.Link
              style={{ marginRight: "20px" }}
              as={Button}
              variant="outline-primary"
              onClick={() => this.props.setAuthedUser(null)}
            >
              Logout
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser];
  return {
    user,
  };
}

export default connect(mapStateToProps, { setAuthedUser })(NavBar);
