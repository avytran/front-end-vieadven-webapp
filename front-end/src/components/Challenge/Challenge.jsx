import React, { useState } from 'react';
import './Challenge.css';

export const Challenge = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const options = [
        { id: 1, color: '#FFD700' },
        { id: 2, color: '#32CD32' },
        { id: 3, color: '#00CED1' },
        { id: 4, color: '#FF69B4' },
    ];

    const correctAnswer = 3;

    const handleOptionClick = (id) => {
        if (result) return;
        setSelectedOption(id);
    };

    const handleChoose = () => {
        if (!selectedOption) return;
        const isCorrect = selectedOption === correctAnswer;
        setResult(isCorrect ? 'correct' : 'incorrect');
        setProgress(progress + 25);
    };

    const handleSkip = () => {
        setSelectedOption(null);
        setResult(null);
        setProgress(progress + 25);
    };

    const handleNext = () => {
        setSelectedOption(null);
        setResult(null);
        setProgress(progress + 25);
    };

    const handleClose = () => {
        console.log("Close button clicked");
    };

    const isFlagEnabled = result !== null;

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
                <button
                    className="flag-button"
                    disabled={!isFlagEnabled}
                    title="Báo cáo câu hỏi"
                >
                    <span className="flag-icon">🏳️</span>
                </button>
            </div>

            {/* Placeholder cho câu hỏi */}
            <div className="question-placeholder">Đèo nào nổi tiếng ở Hà Giang?</div>

            {/* Các ô lựa chọn */}
            <div className="options-grid">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`option-box ${selectedOption === option.id ? 'selected' : ''
                            } ${result && option.id === correctAnswer ? 'correct' : ''
                            } ${result && selectedOption === option.id && !result.includes('correct') ? 'incorrect' : ''
                            }`}
                        style={{ backgroundColor: result ? (option.id === correctAnswer ? '#00CED1' : '#808080') : option.color }}
                        onClick={() => handleOptionClick(option.id)}
                    ></div>
                ))}
            </div>

            {result && (
                <div className={`result-message ${result}`}>
                    {result === 'correct' ? 'Đúng rồi!' : 'Đáp án đúng:'}
                </div>
            )}

            <div className="button-group">
                {!result && (
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
                        TIẾP TỤC
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
    );
};