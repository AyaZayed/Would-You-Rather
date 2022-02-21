import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { userAddQuestion, userAnswerQuestion } from "./usersActions";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

// export function handleAddQuestion(optionOne, optionTwo) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState();

//     dispatch(showLoading());

//     return saveQuestion({
//       optionOneText: optionOne,
//       optionTwoText: optionTwo,
//       author: authedUser,
//     })
//       .then((question) => dispatch(addQuestion(question)))
//       .then(() => dispatch(hideLoading()))
//       .catch((e) => {
//         alert("There was an error. Try again");
//       });
//   };
// }

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(userAddQuestion({ authedUser, qid: question.id }));
      })
      .then(() => dispatch(hideLoading()))
      .catch((error) => {
        console.log("console error : ", error);
      });
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    payload: {
      authedUser,
      qid,
      answer,
    },
  };
}
export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(answerQuestion({ authedUser, qid, answer }));
        dispatch(userAnswerQuestion({ authedUser, qid, answer }));
      })
      .then(() => dispatch(hideLoading()))
      .catch((error) => {
        console.log("error ", error);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
}
