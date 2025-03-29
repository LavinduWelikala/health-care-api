import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddQuestions() {
  const [question, setquestion] = useState("");
  const [answertype, setanswertype] = useState("");
  const [inputValues, setInputValues] = useState([{ point: "", value: "" }]);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const category = "Drug Addiction";

  const handleInputChange = (e, idx) => {
    const values = [...inputValues];
    if (e.target.name === "inputValueMcq") {
      values[idx].point = e.target.value;
    } else {
      values[idx].value = e.target.value;
    }
    setInputValues(values);
  };

  const handleAddInput = () => {
    const values = [...inputValues];
    values.push({ point: "", value: "" });
    setInputValues(values);
  };

  const handleRemoveInput = (idx) => {
    const values = [...inputValues];
    values.splice(idx, 1);
    setInputValues(values);
  };

  useEffect(() => {
    const atypeRange = document.getElementById("atypeRange");
    const atypemc = document.getElementById("atypemc");
    const tfmsg = document.getElementById("tfmsg");
    if (answertype === "range") {
      tfmsg.classList.add("d-none");
      atypeRange.classList.remove("d-none");
      atypemc.classList.add("d-none");
    } else if (answertype === "mcq" || answertype === "msq") {
      inputValues.splice(1, inputValues.length);
      tfmsg.classList.add("d-none");
      atypeRange.classList.add("d-none");
      atypemc.classList.remove("d-none");
    } else if (answertype === "tf") {
      tfmsg.classList.remove("d-none");
      atypeRange.classList.add("d-none");
      atypemc.classList.add("d-none");
    }
    const handleClick = (idxR) => {
      alert(inputValues[idxR]);
    };
  }, [answertype]);

  function setData(e) {
    if (question.length < 5) {
      alert("Question must have more than 5 characters");
    } else {
      if (answertype === "mcq" || answertype === "msq") {
        e.preventDefault();
        const newQuestion = {
          question,
          category,
          answertype,
          inputValues,
        };
        axios.post("http://localhost:8070/quiz/add/", newQuestion);
        window.location.reload();
      } else if (answertype === "tf") {
        e.preventDefault();
        const newQuestion = {
          question,
          category,
          answertype,
        };
        axios.post("http://localhost:8070/quiz/add/", newQuestion);
        window.location.reload();
      } else if (answertype == "range") {
        const values = [...inputValues];
        let idxR = 0;
        while (startPoint === endPoint) {
          values[idxR].point = startPoint;
          values[idxR].value = startPoint;

          values.push({ point: "", value: "" });
          setInputValues(values);
          idxR++;
          startPoint++;
          console.log(values[idxR]);
        }

        e.preventDefault();
        const newQuestion = {
          question,
          category,
          answertype,
          inputValues,
        };
        axios.post("http://localhost:8070/quiz/add/", newQuestion);
        window.location.reload();
      }
    }
  }

  return (
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
                <label id="name-label" for="name">
                  Question
                </label>
                <input
                  type="text"
                  name="name"
                  id="question"
                  placeholder="Enter the question"
                  className="form-control form-control-q"
                  onChange={(e) => {
                    setquestion(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Answer Type</label>
                <select
                  id="answertype"
                  name="role"
                  className="form-control form-control-q"
                  onChange={(e) => {
                    setanswertype(e.target.value);
                  }}
                  required
                >
                  <option disabled selected value>
                    Select
                  </option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="msq">Multiple Select</option>
                  <option value="tf">True / False</option>
                  <option value="range">Range</option>
                </select>
              </div>
            </div>
            <p id="tfmsg" className="text-danger d-none">
              Points for the answer True : 10 and False : 0
            </p>
          </div>
          <div id="atypemc" className="row  text-center d-none">
            <div className="col-8 text-center">
              <div className="form-group form-group-q">
                <label id="name-label" for="name">
                  Add Your Answers
                </label>
                {/* <p className="text-danger">Select checkbox if next question must occur after the answer is selected</p> */}
                {inputValues.map((input, idx) => (
                  <div key={idx} className="row">
                    <div className="col-10">
                      <div className="row">
                        <div className="col-8">
                          <input
                            type="text"
                            id="name"
                            placeholder={"Add Answers One By One"}
                            className="form-control form-control-q mt-1"
                            name="inputValueMcq"
                            value={input.inputValue}
                            onChange={(e) => handleInputChange(e, idx)}
                          />
                        </div>
                        <div className="col-3">
                          <input
                            type="text"
                            placeholder="Points"
                            className="form-control form-control-q mt-1"
                            name="value"
                            value={input.value}
                            onChange={(e) => handleInputChange(e, idx)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      {idx > 0 && (
                        <button
                          type="button"
                          className="btn  btn-q btn-ptimary-q btn-block btn-danger-q"
                          onClick={() => handleRemoveInput(idx)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="">
                  <button
                    type="button"
                    onClick={handleAddInput}
                    className="btn btn-primary btn-q btn-primary-q btn-block "
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="atypeRange" className="row d-none">
            <p className="text-danger">
              Points for the answer will get as selecting the range
            </p>
            <div className="col-5">
              <div className="form-group form-group-q">
                <label id="name-label" for="name">
                  Start Point
                </label>
                <input
                  type="text"
                  name="startPoint"
                  id="name"
                  onChange={(e) => {
                    setStartPoint(e.target.value);
                  }}
                  placeholder="Input &lt; End Point"
                  className="form-control form-control-q"
                  required
                />
              </div>
            </div>
            <div className="col-5">
              <div className="form-group form-group-q">
                <label id="name-label" for="name">
                  End Point
                </label>
                <input
                  type="text"
                  name="endPoint"
                  id="name"
                  onChange={(e) => {
                    setEndPoint(e.target.value);
                  }}
                  placeholder="Input &gt; Start Point"
                  className="form-control form-control-q"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
              <button
                type="submit"
                id="submit"
                className="btn btn-primary btn-q btn-primary-q btn-block"
                onClick={setData}
              >
                Submit Question
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
