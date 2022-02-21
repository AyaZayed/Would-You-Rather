import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Card, Button } from "react-bootstrap";

export class Question extends Component {
  render() {
    const { question, asker } = this.props;

    return (
      <div>
        {asker != null && (
          <div>
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
                <Card.Text>{question.optionOne.text}...</Card.Text>
                <Button variant="primary">View Question Details</Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const asker = question ? users[question.author] : null;
  return {
    question,
    asker,
  };
}

export default connect(mapStateToProps)(Question);
