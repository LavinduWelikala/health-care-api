import React from "react";
var count=0;
function QuizContainer(){
    if(count==0){
        return(
            <div className="container quiz-container">
            <h3 className="text-start">Choose your category to identify your risk level</h3>
            <div className="text-center mt-5">
                <button className=" btn btn-primary mx-2">Drug Addiction</button>
                <button className=" btn btn-primary mx-2">Stress</button>
                <button className=" btn btn-primary mx-2">Obesity</button>
            </div>
        </div>
        )
    }
}
export default QuizContainer;