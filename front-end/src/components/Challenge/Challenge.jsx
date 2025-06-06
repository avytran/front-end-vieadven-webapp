import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Challenge.css';
import questionsData from '../../mocks/data/questions.json';
import { getQuestionsAnswer } from '../../api/questionAnswer.service';
import { updateGamePlay } from '../../api/gamePlay.service';

const player_id = "US002";
const colors = ['#FFD56C', '#1DB973', '#23D3FF', '#FF5E8C'];

export const Challenge = () => {
    const { landmark_id } = useParams(); 
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const qandAResponse = await getQuestionsAnswer(landmark_id);
            setQuestions(qandAResponse);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
        
    }, [landmark_id])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const currentQuestion = useMemo(() => questions?.[currentQuestionIndex], [currentQuestionIndex, questions]);

    const handleOptionClick = (id) => {
        if (result) return;
        setSelectedOption(id);
    };

    const handleChoose = () => {
        if (!selectedOption) return;
        const isCorrect = selectedOption === currentQuestion.answers.find(item => item.is_correct).answer_id;
        setResult(isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            setScore(prev => prev + 1);
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

    const handleNext = async () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setResult(null);
            const progressPercent = ((currentQuestionIndex + 1) / questionsData.length) * 100;
            setProgress(progressPercent);
        } else {
            console.log("Quiz completed!");
            setProgress(100);
            console.log(landmark_id);
            
            await updateGamePlay(player_id, landmark_id, 20);
            navigate(`/landmark/${landmark_id}/completed`);
        }
    };

    const handleClose = () => {
        navigate('/')
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
                {currentQuestion?.content}
            </div>

            <div className="options-grid">
                {currentQuestion?.answers?.map((option, index) => (
                    <div
                        key={option.answer_id}
                        className={`option-box ${selectedOption === option.answer_id ? 'selected' : ''}
                            ${result && option.is_correct ? 'correct' : ''}
                            ${result && selectedOption === option.answer_id && !option.is_correct ? 'incorrect' : ''}`}
                        style={{
                            backgroundColor: result
                                ? (option.answer_id === option.is_correct ? '#00CED1' : '#808080')
                                : colors[index]
                        }}
                        onClick={() => handleOptionClick(option.answer_id)}
                    >
                        {option.content}
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
                                    {" " + currentQuestion.answers.find(opt => opt.is_correct).content}
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