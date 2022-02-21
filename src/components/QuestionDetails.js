import React, { Component } from "react";
import { connect } from "react-redux";
import ViewVotes from "./ViewVotes";
import AnswerQuestion from "./AnswerQuestion";

class QuestionDetails extends Component {
  render() {
    const { answered, id, answer } = this.props;
    return (
      <div>
        {answered ? (
          <ViewVotes id={id} />
        ) : (
          <AnswerQuestion id={id} answer={answer} />
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }, { match }) {
  const { id } = match.params;
  const question = questions[id];
  const answered = question
    ? question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    : false;
  const answer = question ? users[authedUser].answers[id] : null;

  return {
    id,
    answered,
    answer,
  };
}

export default connect(mapStateToProps)(QuestionDetails);
