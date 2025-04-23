import React, { useCallback, useEffect, useState } from 'react';
import './LandmarkCard.css';
import { Stars } from '../Stars';
import { getGamePlay } from '../../api/gamePlay.service';

export const LandmarkCard = ({ landmark }) => {
  const [gamePlayInfo, setGamePlayInfo] = useState({});

  const fetchGamePlayInfo = useCallback(async () => {
    try {
      const response = await getGamePlay("US001", landmark?.landmark_id);
      setGamePlayInfo(response.data);
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchGamePlayInfo();
  }, [fetchGamePlayInfo]);

  return (
    <div className={`landmark-card-container ${gamePlayInfo?.is_completed ? 'completed' : ''}`}>
        <img className="landmark-img" src={landmark?.image_url} alt={landmark?.landmark_name} />
        <div className="landmark-name-tag">
            <p className="landmark-name">{landmark?.landmark_name}</p>
            <div className="landmark-score">
              <span>{gamePlayInfo?.score}</span>
              <span>/{landmark?.total_question}</span>
            </div>
            <Stars stars={gamePlayInfo?.star} />
        </div>
    </div>
  )
}
