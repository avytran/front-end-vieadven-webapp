import React, { useState } from 'react';
import './MissionCard.css';
import { treasureChestIcon } from '../../assets/images/daily-mission-icons';
import { ProgressBar } from '../ProgressBar';
import { questionMarkIcon } from '../../assets/images/daily-mission-icons';

export const MissionCard = ({ mission }) => {
    const [isCompleted, setIsCompleted] = useState(mission.progress === mission.target && !mission.claimed);
    const [isClaimed, setIsClaimed] = useState(mission.claimed);

    const handleClaim = async () => {
        try {
            console.log("Claiming mission:", mission.mission_id);

            // Call the API to claim the mission reward
            // Add item
            // Update the isCompleted state to true
            // Update the state to reflect the claimed mission
            setIsClaimed(true);
        } catch (error) {
            console.error('Error claiming mission:', error);
        }
    }

    return (
        <div className={`mission-card ${isCompleted ? 'highlighted' : ''} ${isClaimed ? 'claimed' : ''}`}>
            <div className="mission-content">
                <div className="mission-icon">
                    <img src={questionMarkIcon} alt="Mission icon" className="icon-image" />
                </div>
                <div className="mission-info">
                    <h3>{mission.title}</h3>
                    <div className="progress-bar-container">
                        <ProgressBar value={mission.progress} max={mission.target} />
                        <div className="reward-icon">
                            <img src={treasureChestIcon} alt="Reward" className="icon-image vietnam-hat-reward" />
                        </div>
                    </div>
                </div>

            </div>
            {isCompleted && !isClaimed && (
                <div className="claim-button-container">
                    <button onClick={handleClaim} className="claim-button">Nhận</button>
                </div>
            )}
        </div>
    )
}
