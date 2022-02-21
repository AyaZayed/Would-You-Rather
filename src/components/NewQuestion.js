import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questionsActions";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  onChange = (e, text) => {
    const value = e.target.value;
    if (text === "one") {
      this.setState(() => ({
        optionOneText: value,
      }));
    } else if (text === "two") {
      this.setState(() => ({
        optionTwoText: value,
      }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;
    dispatch(handleAddQuestion(optionOneText, optionTwoText));
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: authedUser ? false : true,
    }));
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <div>
                <Card style={{ width: "30rem" }} className="mt-5">
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      Create New Question
                    </Card.Title>
                    <Card.Text>Would you rather...</Card.Text>
                    <Form
                      onSubmit={this.onSubmit}
                      className="justify-content-center"
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Option One</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Enter option one text here"
                          onChange={(e) => this.onChange(e, "one")}
                          value={this.state.optionOneText}
                          name="option1"
                        />
                      </Form.Group>
                      <h6>OR</h6>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Card.Text>Option Two</Card.Text>

                        <Form.Control
                          type="text"
                          placeholder="Enter option two text here"
                          onChange={(e) => this.onChange(e, "two")}
                          value={this.state.optionTwoText}
                          name="option2"
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(connect()(NewQuestion));
