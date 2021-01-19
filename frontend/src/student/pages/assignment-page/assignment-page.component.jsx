import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import AssignmentAndTestSidenav from '../../components/assignment-test-sidenav/assignment-test-sidenav.component';

// import SideNav from '../../components/SideNav/SideNav';
import { submitAssignmentStart } from '../../redux/assignment-page/assignment-page.actions';
// import { fetchAssignmentStart } from '../../redux/assignment-page/assignment-page.actions';
import {
  selectAssignmentMessageFromBackend,
  selectAssignmentQuestions,
  selectIsAssignmentSubmitting,
  selectAssignmentSubmittedConfirmationMessage,
  selectHasAssignmentSubmissionFailed,
  selectAssignmentName,
} from '../../redux/assignment-page/assignment-page.selectors';
import {
  selectCurrentCourseId,
  selectCurrentCourseTopicId,
  selectCurrentCourseTopicName,
} from '../../redux/student/student.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';

import StudentDashboardNavbar from '../../components/student-dashboard-navbar/student-dashboard-navbar.component';

import {
  PageWrapper,
  AssignmentTitle,
  QuestionsWrapper,
  QuestionCardWrapper,
  // QuestionCardContainer,
  QuestionStatementContainer,
  QuestionNoSpan,
  QuestionsOptionsContainer,
  RadioLabel,
  RadioInput,
  RadioIndicator,
  CheckedLabel,
  CheckedInput,
  CheckedIndicator,
  // QuestionWrapper,
  // AssignmentWrapper,
  // WrappingQuestions,
  // AssignmentName,
  // AssignmentForm,
  // AllQuestions,
  // Questions,
  // Options,
} from './assignment-page.styles';
// import questionData from './data';

class AssignmentPage extends React.Component {
  constructor() {
    super();

    this.state = {
      resp: {},
      score: null,
      questionsForGeneratingResponseSheet: null,
      assignmentDone: null,
    };
  }

  handleOnChange = (e) => {
    //console.log(e.target.value);
    //console.log(e.target.name);
    // const responses = this.resp.push({name: [e.target.value]})
    //console.log(responses)
    //  this.setState({ selectedOption: e.target.value});
    //console.log(resp)
    const {
      assignment_questions,
      // assignmentName,
      // isAssignmentSubmitting,
      // assignmentSubmittedConfirmation,
      // assignmentSubmissionFailed,
    } = this.props;
    const value = e.target.value;
    const name = e.target.name;
    console.log('NAME:', name);
    console.log('VALUE:', value);
    console.log('QUESTIONS ARRAY', assignment_questions);

    if (assignment_questions) {
      console.log('QUESTION REFERRED TO IS', assignment_questions[name]);
    }

    let response = this.state.resp;
    let questionType = assignment_questions[name].type;
    console.log('QUESTION TYPE IS', questionType);
    if (questionType === 'MULTICORRECT') {
      if (response[name] == undefined) {
        response[name] = [value];
      } else if (response[name].includes(value)) {
        let temp = response[name].filter((item) => {
          return item !== value;
        });
        response[name] = temp;
      } else {
        response[name].push(value);
      }
    } else {
      response[name] = [value];
    }

    console.log('RESPONSE BECOMES', response);
    this.setState({
      resp: response,
    });
  };

  handleSubmitSuccess = () => {
    // only call when post request is completed
    const { history } = this.props;
    history.push('/student/course');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { assignment_questions, submitAssignmentStart } = this.props;
    const { resp } = this.state;
    console.log('SUBMITTING ASSIGNMENT NOW');
    console.log('QUESTIONS ARE NOW', assignment_questions);
    console.log('RESPONSES OF USER are', resp);
    // calculate score
    let userResponses = Object.values(resp);
    console.log('RESPONSES OF USER IN ARRAY FORM are', userResponses);
    let score = 0;
    userResponses.map((userAnswerArray, index) => {
      let totalScorableMarksForQuestion = assignment_questions[index].maxMarks;
      let correctAnswerArray = assignment_questions[index].correctAns;
      let correctAnswerObj = {};
      correctAnswerArray.map((correctOption) => {
        correctAnswerObj[correctOption] = 'correct';
      });
      console.log(
        'CORRECT OPTIONS FOR EACH QUESTION FORM are',
        index,
        'OBJ - ',
        correctAnswerObj
      );
      let answersMarkedCorrect = 0;
      userAnswerArray.map((userMarkedOption) => {
        if (correctAnswerObj[userMarkedOption]) {
          answersMarkedCorrect = answersMarkedCorrect + 1;
        }
      });
      console.log('answers marked correct are', answersMarkedCorrect);
      if (answersMarkedCorrect === correctAnswerArray.length) {
        score = score + totalScorableMarksForQuestion;
        console.log('score after this question', score);
      }
    });
    console.log('SCORE IS', score);
    let data = {};
    data['marksScored'] = score;
    this.setState({
      score: score,
      questionsForGeneratingResponseSheet: assignment_questions,
    });
    submitAssignmentStart(data);
    // alert('YOUR SCORE FOR THIS ATTEMPT IS', score);
  };

  componentWillUnmount = () => {
    // SUBMIT ASSIGNMENT
  };

  render() {
    const {
      assignment_questions,
      assignmentName,
      isAssignmentSubmitting,
      assignmentSubmittedConfirmation,
      assignmentSubmissionFailed,
    } = this.props;
    const { score, resp, questionsForGeneratingResponseSheet } = this.state;
    console.log('ASSIGNMENT QUESTIONS RECIEVED', assignment_questions);
    return (
      <>
        <StudentDashboardNavbar />
        <AssignmentAndTestSidenav forAssignment />
        <PageWrapper>
          {assignmentSubmittedConfirmation ? null : (
            <form onSubmit={this.handleSubmit} onChange={this.handleOnChange}>
              <AssignmentTitle>ASSIGNMENT : {assignmentName}</AssignmentTitle>
              <QuestionsWrapper>
                {/* {assignment_questions} */}
                {assignment_questions
                  ? assignment_questions.map((question, index) => {
                      return (
                        <QuestionCardWrapper>
                          <QuestionStatementContainer>
                            <QuestionNoSpan>{index + 1}.&nbsp; </QuestionNoSpan>
                            {question.statement}
                          </QuestionStatementContainer>
                          <QuestionsOptionsContainer>
                            {question.type === 'MULTICORRECT' ? (
                              <>
                                {question.options.map((option, optionIndex) => {
                                  return (
                                    <CheckedLabel
                                      htmlFor={`${option}${index}${optionIndex}`}
                                    >
                                      {/* <label key={index} htmlFor={option}> */}
                                      {option}
                                      <CheckedInput
                                        type='checkbox'
                                        key={question.statement}
                                        id={`${option}${index}${optionIndex}`}
                                        name={index}
                                        value={option}
                                      />
                                      <CheckedIndicator />
                                    </CheckedLabel>
                                  );
                                })}
                              </>
                            ) : question.type === 'SINGLECORRECT' ? (
                              <>
                                {question.options.map((option, optionIndex) => {
                                  return (
                                    <RadioLabel
                                      htmlFor={`${option}${index}${optionIndex}`}
                                    >
                                      {option}
                                      <RadioInput
                                        type='radio'
                                        key={question.statement}
                                        id={`${option}${index}${optionIndex}`}
                                        name={index}
                                        value={option}
                                      />
                                      <RadioIndicator />
                                    </RadioLabel>
                                  );
                                })}
                              </>
                            ) : null}
                          </QuestionsOptionsContainer>
                        </QuestionCardWrapper>
                      );
                    })
                  : null}
              </QuestionsWrapper>
              <div>ARE YOU SURE YOU WANT TO SUBMIT? YOU CAN'T GO BACK...</div>
              <button>Yes, Submit</button>
            </form>
          )}
          {/* For the time when SUBMIT ASSIGNMENT BUTTON IS CLICKED */}

          {isAssignmentSubmitting ? (
            <div>ASSIGNMENT IS SUBMITTING...PLEASE WAIT.</div>
          ) : null}
          {}
          {/* AFTER SUBMISSION IS SUCCESSFUL */}
          {!isAssignmentSubmitting && assignmentSubmittedConfirmation ? (
            
            <>
              <div>ASSIGNMENT SUBMITTED SUCCESSFULLY</div>
              <div>YOUR SCORE IS : {score}</div>
              <div>WHAT WE GOT FROM YOU :</div>
              {console.log('USER RESPONSES ARE', resp)}
              {console.log('ACTUAL ANSWERS ARE', assignment_questions)}
              
              <div style={{margin: '0.5vh 0'}}>
                {assignment_questions.map((question, index) => {
                  return (
                    <div>
                      <div key={index} className='questions'>
                        Q{index + 1}: {question.statement}
                      </div>
                      Options:
                      {question.options.map((option, optionNo) => {
                        return (
                          <>
                            <ul style={{ margin: 0 }}>
                              <li key={optionNo}>{option}</li>
                            </ul>
                          </>
                        );
                      })}
                      Correct Anwer:
                      {question.correctAns.map((ans, answerNo) => {
                        const correctAns = {ans}
                        return (
                          <ul style={{ margin: 0 }}>
                            <li key={answerNo}>{ans}</li>
                          </ul>
                        );
                      })}
                      Your Response:
                      {
                        <>
                          <ul style={{ margin: 0 }}>
                            {this.state.resp[index].map((response, respNo) => {
                              // const UserResponse = {response}
                              return <li key={respNo}>{response}</li>;
                            })}
                          </ul>
                        </>
                      }
                    </div>
                  );
                })}
              </div>
              <button
                onClick={this.handleSubmitSuccess}
                style={{
                  background: 'orange',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                GO BACK TO COURSE PAGE
              </button>
            </>
          ) : null}
          {/* IF SUBMISSION FAILED */}
          {assignmentSubmissionFailed ? (
            <>
              <div>SUBMISSION FAILED, PLEASE TRY AGAIN...</div>
            </>
          ) : null}
        </PageWrapper>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  current_assignment_id: selectCurrentCourseTopicId,
  current_assignment_name: selectCurrentCourseTopicName,
  current_user_id: selectCurrentUserId,
  current_course_id: selectCurrentCourseId,
  assignment_questions: selectAssignmentQuestions,
  assignmentName: selectAssignmentName,
  assignment_message_from_backend: selectAssignmentMessageFromBackend,
  isAssignmentSubmitting: selectIsAssignmentSubmitting,
  assignmentSubmittedConfirmation: selectAssignmentSubmittedConfirmationMessage,
  assignmentSubmissionFailed: selectHasAssignmentSubmissionFailed,
});

const mapDispatchToProps = (dispatch) => ({
  submitAssignmentStart: (data) => dispatch(submitAssignmentStart(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AssignmentPage));

// class AssignmentPage extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       resp: {},
//       sahijawab: [],
//       jawab: [],
//       done: false,
//       score: { marksScored: 0 },
//     };
//   }

//   componentDidMount() {
//     console.log('Assignment Page has mounted');
//     // const user_id = this.props.current_user_id;
//     // const course_id = this.props.current_course_id;
//     // const assignment_id = this.props.current_assignment_id;
//     // const { fetchAssignmentStart } = this.props;
//     // fetchAssignmentStart({ user_id, course_id, assignment_id });
//   }
//   componentWillUnmount() {
//     console.log('Assignment Page Will unmount now');
//   }

//   handleOnChange = (e) => {
//     //console.log(e.target.value);
//     //console.log(e.target.name);
//     // const responses = this.resp.push({name: [e.target.value]})
//     //console.log(responses)
//     //  this.setState({ selectedOption: e.target.value});
//     //console.log(resp)
//     const value = e.target.value;
//     const name = e.target.name;
//     let response = this.state.resp;
//     response[name] = value;
//     console.log(response);
//     this.setState(
//       {
//         resp: response,
//       },
//       () => {
//         console.log(this.state);
//       }
//     );
//   };

//   handleClick = (e) => {
//     e.preventDefault();
//     const questionNumbers = questionData.assignment.questions.map(
//       (number) => number.number
//     );
//     let responses = [];
//     questionNumbers.forEach((questionNumber) => {
//       let response = this.state.resp[questionNumber];
//       responses.push(response);
//     });
//     console.log(responses);
//     this.setState({ jawab: responses });
//     const answers = questionData.assignment.questions.map(
//       (answer) => answer.correctAns[0]
//     );
//     this.setState({ sahijawab: answers });
//     console.log(answers);
//     const compareArray = (a, b) => {
//       let marks = 0;
//       for (let i = 0; i < a.length; i++) {
//         if (a[i] == b[i]) {
//           marks = marks + 1;
//         }
//         //console.log(a[i], b[i])
//       }
//       console.log(marks);
//       this.setState({ score: marks, done: true });
//     };
//     compareArray(responses, answers);
//     console.log(this.state);

//     let data = this.state.score;
//     console.log('page data', data);
//     const { submitAssignmentStart } = this.props;
//     submitAssignmentStart(data);
//   };

//   render() {
//     console.log('Assignment page has rendered');
//     const {
//       assignment_message_from_backend,
//       assignment_questions,
//     } = this.props;
//     let i = -1;
//     return (
//       <>
//         <StudentDashboardNavbar />
//         <AssignmentAndTestSidenav />
//         {this.state.done === false ? (
//           <AssignmentWrapper>
//             {assignment_message_from_backend ? (
//               <div>MESSAGE FROM BACKEND {assignment_message_from_backend}</div>
//             ) : (
//               <div>Loading...</div>
//             )}
//             {assignment_questions ? (
//               <div>QUESTIONS RECEIVED</div>
//             ) : (
//               <div>Loading...</div>
//             )}

//             <WrappingQuestions>
//               <AssignmentName>
//                 Assignment - 1 {questionData.assignment.assignmentName}
//               </AssignmentName>

//               <AssignmentForm onChange={(e) => this.handleOnChange(e)}>
//                 <AllQuestions>
//                   {questionData.assignment.questions.map((question, number) => {
//                     //console.log(option)

//                     return (
//                       <>
//                         <QuestionWrapper>
//                           <Questions key={number}>
//                             Q{question.number}) {question.statement}
//                             <br />
//                           </Questions>
//                           {question.options.map((option, index) => {
//                             //   console.log(option)
//                             //console.log(number)
//                             return (
//                               <>
//                                 <Options>
//                                   <input
//                                     type='radio'
//                                     key={question.statement}
//                                     value={option}
//                                     id={option}
//                                     name={question.number}
//                                   />
//                                   <label key={index} htmlFor={option}>
//                                     {option}
//                                   </label>
//                                   <br />
//                                 </Options>
//                                 <div></div>
//                               </>
//                             );
//                           })}
//                         </QuestionWrapper>
//                       </>
//                     );
//                   })}
//                 </AllQuestions>
//                 <button onClick={(e) => this.handleClick(e)}>submit</button>
//               </AssignmentForm>
//             </WrappingQuestions>
//           </AssignmentWrapper>
//         ) : (
//           <>
//             <div>
//               <div>your score is: {this.state.score.marksScored}</div>
//             </div>
//             <div>
//               {this.state.jawab ? (
//                 <div>
//                   {this.state.jawab.map((responses, index) => {
//                     if (this.state.sahijawab[index] === responses) {
//                       return (
//                         <div>
//                           <div>
//                             {questionData.assignment.questions[index].statement}
//                           </div>
//                           <div>
//                             {questionData.assignment.questions[
//                               index
//                             ].options.map((option) => {
//                               return <div>{option}</div>;
//                             })}
//                           </div>

//                           {responses ? (
//                             <div>
//                               USER GAVE THE CORRECT ANSWER! User response:{' '}
//                               {this.state.jawab[index]}, correct answer:{' '}
//                               {this.state.sahijawab[index]}
//                             </div>
//                           ) : (
//                             <div>
//                               Unattempted, correct answer :
//                               {this.state.sahijawab[index]}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     } else {
//                       return (
//                         <div>
//                           <div>
//                             {questionData.assignment.questions[index].statement}
//                           </div>
//                           <div>
//                             {questionData.assignment.questions[
//                               index
//                             ].options.map((option) => {
//                               return <div>{option}</div>;
//                             })}
//                           </div>

//                           {responses ? (
//                             <div>
//                               {' '}
//                               USER GAVE WRONG ANSWER! User response is:{' '}
//                               {this.state.jawab[index]}, correct answer:{' '}
//                               {this.state.sahijawab[index]}
//                             </div>
//                           ) : (
//                             <div>
//                               Unattempted, correct answer :
//                               {this.state.sahijawab[index]}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     }
//                   })}
//                 </div>
//               ) : null}
//             </div>
//           </>
//         )}
//       </>
//     );
//   }
// }
