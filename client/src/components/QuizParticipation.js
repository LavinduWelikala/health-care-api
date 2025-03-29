import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizParticipation = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8070/quiz/");
        console.log(response);
        const questionsWithAnswers = await Promise.all(response.data.map(async (question) => {
          const answers = await axios.get(`http://localhost:8070/quiz/answersParticipate/${question._id}`);
          return { ...question, answers: answers.data };
        }));
        setQuestions(questionsWithAnswers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const calculatePoints = () => {
    let totalPoints = 0;
    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const answerIndex = question.answers.findIndex((answer) => answer.text === userAnswer);
      const point = question.points[answerIndex];
      totalPoints += point;
    });
    return totalPoints;
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const renderQuestion = (question) => {
    console.log(question); // log the question object
    console.log(question.answers);
  
    let answerInputType = 'radio';
    if (question.answertype === 'msq') {
      answerInputType = 'checkbox';
    } else if (question.answertype === 'tf') {
      answerInputType = 'radio';
    }
  
    return (
      <div>
        <div className="container">
          <div className="header-quiz">
            <h1 className="q-h1 text-center" id="title">
              Thank You
            </h1>
            <p id="descriptionq" className="text-center">
              You are making a real difference in people's lives
            </p>
          </div>
          <div className="form-wrap-q">
            <form id="survey-form">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group form-group-q">
                    <label id="name-label" htmlFor="name">
                      {question.question}
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <ul>
                  {question.answers &&
                    question.answers.map((answer, index) => (
                      <li key={answer.index}>
                        <input
                          type={answerInputType}
                          id={`answer-${index}`}
                          name={`answer-${index}`}
                          value={answer.text}
                          onChange={() => handleAnswer(answer.text)}
                          checked={answers[currentQuestion] === answer.text}
                        />
                        <label htmlFor={`answer-${index}`}>{answer.text}</label>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="submit"
                    id="submit"
                    className="btn btn-primary btn-q btn-primary-q btn-block"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestion === questions.length) {
    const totalPoints = calculatePoints();
    alert(`You scored ${totalPoints} points!`);
    return null;
  }

  return (
    <div>
      {renderQuestion(questions[currentQuestion])}
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default QuizParticipation;