import React, { Component } from "react";
import Question from "./Question";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

export class Home extends Component {
  state = {
    answered: false,
  };

  onChange = (isAnswered) => {
    this.setState(() => ({
      answered: isAnswered,
    }));
  };

  render() {
    let { questionsArray, authedUser } = this.props;
    const { answered } = this.state;

    if (answered) {
      questionsArray = questionsArray.filter(
        (q) =>
          q.optionOne.votes.includes(authedUser) ||
          q.optionTwo.votes.includes(authedUser)
      );
    } else {
      questionsArray = questionsArray.filter(
        (q) =>
          !(
            q.optionOne.votes.includes(authedUser) ||
            q.optionTwo.votes.includes(authedUser)
          )
      );
    }

    return (
      <div>
        <ButtonGroup>
          <ToggleButton
            type="radio"
            variant={"outline-primary"}
            className="ml-3"
            onClick={(e) => this.onChange(false)}
          >
            Unanswered
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant={"outline-secondary"}
            onClick={(e) => this.onChange(true)}
          >
            Answered
          </ToggleButton>
        </ButtonGroup>

        <ListGroup>
          {questionsArray.map((q) => (
            <ListGroupItem key={q.id}>
              <Link to={`questions/${q["id"]}`}>
                <Question id={q.id} answered={answered} />
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    questionsArray: Object.values(questions).sort(
      (a, b) => b.timestamp - a.timestamp
    ),
  };
}

export default connect(mapStateToProps)(Home);
