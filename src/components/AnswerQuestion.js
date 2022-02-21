import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questionsActions";
import { Redirect } from "react-router-dom";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Form,
  Image,
} from "react-bootstrap";

export class AnswerQuestion extends Component {
  state = {
    answer: "",
  };

  onChange = (input) => {
    this.setState(() => ({
      answer: input,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { answer } = this.state;
    const { dispatch, id, authedUser } = this.props;
    dispatch(handleAnswerQuestion({ authedUser, qid: id, answer }));
  };

  render() {
    const { question, asker } = this.props;
    if (!question) {
      return <Redirect to="/notfound" />;
    }

    return (
      <div>
        {asker != null && (
          <div>
            <Container>
              <Row>
                <Col></Col>
                <Col xs={6}>
                  <Card className="mx-3 mt-3">
                    <Card.Header>{asker.name} asks:</Card.Header>
                    <Card.Body>
                      <Image
                        src={`${asker.avatarURL}`}
                        alt={`${asker.name} avatar`}
                        roundedCircle
                        style={{ width: 70, height: 70, marginRight: "20px" }}
                      ></Image>
                      <Card.Title>Would you rather...</Card.Title>
                      {question !== undefined && (
                        <Form onSubmit={(e) => this.onSubmit(e)}>
                          <Form.Group>
                            <Form.Check
                              type="radio"
                              name="option1"
                              id="option1"
                              inline
                              label={`${question.optionOne.text}`}
                              onChange={() => this.onChange("optionOne")}
                              value={`${question.optionOne.text}`}
                            ></Form.Check>

                            <Form.Check
                              type="radio"
                              name="option2"
                              inline
                              label={`${question.optionTwo.text}`}
                              id="option2"
                              onChange={() => this.onChange("optionTwo")}
                              value={`${question.optionTwo.text}`}
                            ></Form.Check>
                          </Form.Group>

                          <Button
                            variant="success"
                            type="submit"
                            className="mt-3"
                            disabled={this.state.answer === null}
                          >
                            Submit
                          </Button>
                        </Form>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const asker = question ? users[question.author] : null;
  return {
    question,
    asker,
    authedUser,
  };
}

export default connect(mapStateToProps)(AnswerQuestion);
