import React from 'react';
import HeaderQuiz from './HeaderQuiz';
import QuizContainer from './QuizContainer';
import FooterQuiz from './FooterQuiz';
import NavBar from './NavBar';
function QuizList(){
    return(
        <div>
        <NavBar/>
        <HeaderQuiz/>
        <QuizContainer/>
        <FooterQuiz/>
        </div>
    )
}
export default QuizList;