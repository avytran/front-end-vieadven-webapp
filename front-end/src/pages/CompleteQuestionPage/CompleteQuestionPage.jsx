import React from 'react';
import './CompleteQuestionPage.css'
import { useParams } from 'react-router-dom';

export const CompleteQuestionPage = () => {
    const { landmark_id } = useParams();
    return (
        <div className="complete-question-page">

        </div>
    )
}
