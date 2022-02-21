import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col, Image, ProgressBar } from "react-bootstrap";

export class ViewVotes extends Component {
  render() {
    const {
      question,
      asker,
      totalVotes,
      optionOneVotes,
      optionTwoVotes,
      optionOnePercent,
      optionTwoPercent,
      answer,
    } = this.props;

    return (
      <div>
        <Container>
          <Row>
            <Col></Col>
            <Col xs={6} className="mt-5">
              {asker != null && (
                <Card>
                  <Card.Header>Asked by {asker.name}</Card.Header>
                  <Container>
                    <Row>
                      <Col xs={6} md={4} id="votesImg">
                        <Image
                          src={`${asker.avatarURL}`}
                          alt={`${asker.name} avatar`}
                          roundedCircle
                          style={{ width: 120, height: 120, marginTop: 90 }}
                        ></Image>
                      </Col>
                      <Col xs={12} md={8}>
                        <Card.Body>
                          <Card.Title>Results:</Card.Title>
                          <div
                            className="authedVote"
                            id={answer === "optionOne" ? "myVote" : null}
                          >
                            <Card.Text data-badge="Your Vote">
                              Would you rather {question.optionOne.text} ?
                            </Card.Text>
                            <ProgressBar
                              now={optionOnePercent}
                              label={`${optionOnePercent}%`}
                            />
                            <span>
                              {optionOneVotes} of {totalVotes} votes
                            </span>
                          </div>
                          <div
                            className="authedVote"
                            id={answer === "optionTwo" ? "myVote" : null}
                          >
                            <Card.Text data-badge="Your Vote">
                              Would you rather {question.optionTwo.text} ?
                            </Card.Text>
                            <ProgressBar
                              now={optionTwoPercent}
                              label={`${optionTwoPercent}%`}
                            />
                            <span>
                              {optionTwoVotes} of {totalVotes} votes
                            </span>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              )}
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id, answer }) {
  const question = questions[id];
  const asker = question ? users[question.author] : null;
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const optionOnePercent = (optionOneVotes / totalVotes) * 100;
  const optionTwoPercent = (optionTwoVotes / totalVotes) * 100;

  return {
    question,
    asker,
    totalVotes,
    optionOneVotes,
    optionTwoVotes,
    optionOnePercent,
    optionTwoPercent,
    answer,
  };
}

export default connect(mapStateToProps)(ViewVotes);
