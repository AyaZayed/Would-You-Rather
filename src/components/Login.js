import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUserActions";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

export class Login extends Component {
  state = {
    user_id: null,
    toHome: false,
  };

  onChange = (e) => {
    const id = e.target.value;
    console.log(id);
    this.setState(() => ({
      user_id: id,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { user_id } = this.state;
    const { dispatch } = this.props;
    dispatch(setAuthedUser(user_id));

    this.setState(() => ({
      toHome: true,
    }));
  };

  componentDidMount() {
    this.props.dispatch(setAuthedUser(null));
  }

  render() {
    const { users } = this.props;
    const { user_id, toHome } = this.state;
    const selection = user_id ? user_id : null;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <div>
              <Card style={{ width: "30rem" }} className="mt-5">
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    Welcome to the Would You Rather Game
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    style={{ height: "15rem" }}
                    src="https://www.momof6.com/wp-content/uploads/2015/09/Would-You-Rather-Label.png"
                  />
                  <Card.Text>Please sign in to continue</Card.Text>

                  <Form onSubmit={(e) => this.onSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => this.onChange(e)}
                        value={`${selection}`}
                      >
                        <option>Select A User</option>
                        {Object.keys(users).map((key) => (
                          <option value={key} key={key}>
                            {users[key].name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={user_id === null}
                    >
                      Sign In
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
