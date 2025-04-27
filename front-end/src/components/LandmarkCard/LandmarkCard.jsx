import React, { useCallback, useEffect, useState } from 'react';
import './LandmarkCard.css';
import { Stars } from '../Stars';
import { ConfirmedDialog } from '../ConfirmedDialog';

export const LandmarkCard = ({ landmark, setSelectedLandmarkId }) => {
  const handleClick = () => {
    setSelectedLandmarkId(landmark.landmark_id);

  }
  return (
    <div onClick={handleClick} className={`landmark-card-container ${landmark?.is_completed ? 'completed' : ''}`}>
      <img className="landmark-img" src={landmark?.image_url} alt={landmark?.landmark_name} />
      <div className="landmark-name-tag">
        <p className="landmark-name">{landmark?.landmark_name}</p>
        <div className="landmark-score">
          <span>{landmark?.score}</span>
          <span>/{landmark?.total_question}</span>
        </div>
        <Stars stars={landmark?.star} />
      </div>
    </div>
  )
}
