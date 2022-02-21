import {
  GET_QUESTIONS,
  ADD_QUESTION,
  ANSWER_QUESTION,
} from "../actions/questionsActions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, ...action.questions };

    case ADD_QUESTION:
      return { ...state, [action.question.id]: action.question };

    case ANSWER_QUESTION:
      const { qid, answer, authedUser } = action.payload;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };

    default:
      return state;
  }
}
