import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

export default function ViewQuestions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [activeCollapse, setActiveCollapse] = useState(0);
  const [questionToRemove, setQuestionToRemove] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      axios
        .get("http://localhost:8070/ipayments/")
        
      try {
        const questionsRes = await axios.get("http://localhost:8070/quiz/").then((res) => {
          const filteredQuestions = res.data.filter((data) =>
                data.question.toLowerCase().includes(searchQuery.toLowerCase())              
              );
              
        setQuestions(filteredQuestions);
        })
      } catch (error) {
        alert(error.message);
      }
    }
    fetchData();
  }, [[searchQuery]]);
  const filteredQuestionList = questions.filter((question) => {
    return (
      question.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const toggleCollapse = async (index, questionId) => {
    setActiveCollapse(index === activeCollapse ? -1 : index);
    try {
      const answersRes = await axios.get(`http://localhost:8070/quiz/answers/${questionId}`);
      setAnswers(answersRes.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveQuestion = async () => {
    try {
      await axios.delete(`http://localhost:8070/quiz/delete/${questionToRemove}`);
      setQuestions(questions.filter((q) => q._id !== questionToRemove));
    } catch (error) {
      alert(error.message);
    }
    setQuestionToRemove(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;
    let category = null;
  
    doc.setFontSize(12);
    doc.text("Quiz Report", 10, 10);
  
    questions.forEach((question, index) => {
      if (question.category !== category) {
        category = question.category;
        doc.setFontSize(16);
        doc.text(`Category: ${category}`, 10, y);
        y += 10;
        doc.setFontSize(12);
      }
      doc.text(`Question ${index + 1}: ${question.question}`, 10, y);
      y += 10;
    });
  
    const total = questions.length;
    doc.text(`Total questions: ${total}`, 10, doc.internal.pageSize.height - 10);
  
    doc.save("quiz-report.pdf");
  };
  
  
  return (
    <div>
      <div className="container container-viewq">
        <div className="row">
          <div className="col-6">
          <div className="search-container bg-primary p-2"style={{width:"60"}}>
          
                <input type="text"className="form-control" placeholder="Search For A Question" onChange={handleSearch} 
                style={{
                    borderRadius: "5px",
                    border:0,
                    alignItems:"center",
                    width: "100%",
                    paddingLeft:"20px",
                    backgroundColor: "#ffffff",
                  }}/>
            </div>
          </div>
          <div className="col-6">
            <div style={{textAlign:"right"}}>
            <button className="btn btn-primary mx-3" onClick={generatePDF}> Generate PDF</button>
            <button className="btn btn-primary" onClick={() => navigate("/add-quiz")}> Add +</button>
          </div>
          </div>
        </div>
        <div className="header-quiz">
          <h1 className="q-h1" id="title">
            Thank You
          </h1>
          <p id="descriptionq" className="text-center">
            You are making a real difference in people's lives
          </p>
        </div>
        <div className="view-wrap-q">
          <div className="text-center bg-primary text-white">
            <span>Your Recently Added Questions</span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div id="accordion">
                {questions.map((question, index) => {
                  const filteredAnswers = answers.filter(
                    (answer) => answer.quizId === question._id
                  );
                  return (
                    <div className="card mt-1 mb-1" key={question._id}>
                      <div
                        className="card-header "
                        id={`heading-${index}`}
                        onClick={() => toggleCollapse(index, question._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="row">
                          <div className="col-9">
                            <h5 className="mb-0">
                              <a
                                role="button"
                                data-bs-toggle="collapse"
                                href={`#collapse-${index}`}
                                aria-expanded={activeCollapse === index}
                                aria-controls={`collapse-${index}`}
                              >
                                {question.question}
                              </a>
                            </h5>
                          </div>
                          <div className="col-1">
                            <Link
                              to={`/editquiz/${question._id}`}
                              className="btn btn-primary"
                            >
                              Edit
                            </Link>
                          </div>
                          <div className="col-1">
                            <button
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Remove</h5>
                                <button
                                  type="button"
                                  className="close bg-white border-0"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span
                                    className="text-danger"
                                    aria-hidden="true"
                                  >
                                    x
                                  </span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <p>Are you sure to remove your question ?</p>
                              </div>
                              <div class="modal-footer">
                                <button type="button"
                                    className="btn btn-danger"
                                    onClick={async () => {
                                      try {
                                        await axios.delete(
                                          `http://localhost:8070/quiz/delete/${question._id}`
                                        );
                                        const filteredQuestions = questions.filter(
                                          (q) => q._id !== question._id
                                        );
                                        setQuestions(filteredQuestions);
                                        window.location.reload();
                                      } catch (error) {
                                        alert(error.message);
                                      }
                                    }}>
                                  Remove
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id={`collapse-${index}`}
                        className={`collapse ${
                          activeCollapse === index ? "show" : ""
                        }`}
                        data-parent="#accordion"
                        aria-labelledby={`heading-${index}`}
                      >
                        <div className="card-body">
                        <div className="row">
                          {answers.map((answer, index) => (
                            <div className="col-3">
                            <h5 key={index}> {answer}</h5>
                            </div>
                          ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
              }