import React, { useState } from 'react';
import './Challenge.css';
import questionsData from '../../mocks/data/questions.json';

export const Challenge = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const currentQuestion = questionsData[currentQuestionIndex];

    const colors = ['#FFD56C', '#1DB973', '#23D3FF', '#FF5E8C'];

    const handleOptionClick = (id) => {
        if (result) return;
        setSelectedOption(id);
    };

    const handleChoose = () => {
        if (!selectedOption) return;
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        setResult(isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            setSelectedOption(null);
        } else {
            setSelectedOption(currentQuestion.correctAnswer);
        }
        const progressPercent = (currentQuestionIndex / questionsData.length) * 100;
        setProgress(progressPercent);
    };

    const handleSkip = () => {
        setResult('incorrect');
        setSelectedOption(currentQuestion.correctAnswer);
        const progressPercent = (currentQuestionIndex / questionsData.length) * 100;
        setProgress(progressPercent);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setResult(null);
            const progressPercent = ((currentQuestionIndex + 1) / questionsData.length) * 100;
            setProgress(progressPercent);
        } else {
            console.log("Quiz completed!");
            setProgress(100);
        }
    };

    const handleClose = () => {
        console.log("Close button clicked");
    };

    const handleReport = () => {
        console.log("Report button clicked");
    };

    return (
        <div className="challenge-container">
            <div className="progress-header">
                <button
                    className="close-button"
                    onClick={handleClose}
                    title="Đóng"
                >
                    ✕
                </button>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

            </div>

            <div className="question-placeholder">
                {currentQuestion.question}
            </div>

            <div className="options-grid">
                {currentQuestion.options.map((option, index) => (
                    <div
                        key={option.id}
                        className={`option-box ${selectedOption === option.id ? 'selected' : ''}
                            ${result && option.id === currentQuestion.correctAnswer ? 'correct' : ''}
                            ${result && selectedOption === option.id && option.id !== currentQuestion.correctAnswer ? 'incorrect' : ''}`}
                        style={{
                            backgroundColor: result
                                ? (option.id === currentQuestion.correctAnswer ? '#00CED1' : '#808080')
                                : colors[index]
                        }}
                        onClick={() => handleOptionClick(option.id)}
                    >
                        {option.text}
                    </div>
                ))}
            </div>

            <div className={`action-controller ${result}`}>
                <div className="button-group" >
                    {result ? (
                        <div className={`result-message ${result}`}>
                            <div className="flag-icon" onClick={handleReport}>🚩</div>
                            {result === 'correct' ? 'Đúng rồi!' : 'Đáp án đúng:'}
                            {result !== 'correct' && (
                                <span className="correct-answer">
                                    {" " + currentQuestion.options.find(opt => opt.id === currentQuestion.correctAnswer).text}
                                </span>
                            )}
                        </div>
                    ) : (
                        <button
                            className="skip-button"
                            onClick={handleSkip}
                        >
                            BỎ QUA
                        </button>
                    )}

                    {result ? (
                        <button
                            className={`next-button ${result}`}
                            onClick={handleNext}
                        >
                            {currentQuestionIndex < questionsData.length - 1 ? 'TIẾP TỤC' : 'KẾT THÚC'}
                        </button>
                    ) : (
                        <button
                            className="choose-button"
                            onClick={handleChoose}
                            disabled={selectedOption === null}
                        >
                            CHỌN
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};