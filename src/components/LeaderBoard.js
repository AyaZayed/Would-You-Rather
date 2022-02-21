import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Card,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";

export class LeaderBoard extends Component {
  render() {
    const { usersScoresList } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col></Col>
            <Col xs={7}>
              {" "}
              <ListGroup>
                {usersScoresList.map((user) => (
                  <ListGroupItem key={user.id}>
                    <Card className="mb-3">
                      <Card.Header>
                        <Card.Title className="mt-2">{user.name}</Card.Title>
                      </Card.Header>
                      <Container>
                        <Row>
                          <Col>
                            {" "}
                            <Image
                              src={`${user.avatarURL}`}
                              alt={`${user.name} avatar`}
                              roundedCircle
                              style={{
                                width: 120,
                                height: 120,
                                marginTop: 20,
                                marginBottom: 20,
                              }}
                            ></Image>
                          </Col>
                          <Col xs={6}>
                            <Card.Body>
                              <div className="mt-4">
                                <Card.Title>
                                  Answered Questions{"  "}
                                  <span className="num">
                                    {Object.values(user.answers).length}
                                  </span>
                                </Card.Title>
                                <Card.Title>
                                  Created Questions{"  "}
                                  <span className="num">
                                    {user.questions.length}
                                  </span>
                                </Card.Title>
                              </div>
                            </Card.Body>
                          </Col>
                          <Col className="pt-5">
                            <h5>
                              Score{"  "}
                              <span className="num">{user.score}</span>
                            </h5>
                          </Col>
                        </Row>
                      </Container>
                    </Card>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  let usersList = Object.values(users);
  usersList.map(
    (user) =>
      (user.score = user.questions.length + Object.values(user.answers).length)
  );
  const usersScoresList = usersList.sort((a, b) => b.score - a.score);
  return {
    usersScoresList,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
