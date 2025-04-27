import React, { useCallback, useEffect, useState } from 'react';
import './ProvinceDetails.css';
import { LandmarkSlider } from '../LandmarkSlider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../Card";
import { ProgressBar } from '../ProgressBar';
import { star, gift } from '../../assets/images/card-icons';
import { getPlayerProvinceProgress } from '../../api/provinceProgress.service';
import { getGameplayByUserIdAndProvinceId } from '../../api/gamePlay.service';
import { getProvinceName } from '../../utils/getProvinceUtil';

const player_id = "US002";
export const ProvinceDetails = ({ gamePlay, setGamePlay, setSelectedLandmarkId, allowedProvince, landmarks, currentProvince, handleResetZoom }) => {
    const [progress, setProgress] = useState({});
    
    const fetchProvinceProgress = useCallback(async () => {
        try {
            const gameplayResponse = await getGameplayByUserIdAndProvinceId(currentProvince, player_id)
            setGamePlay(gameplayResponse.data);
            const response = await getPlayerProvinceProgress(player_id, currentProvince);
            setProgress(response.data);

            console.log(response.data);
            
        } catch (error) {
            console.error("API Error:", error);
        }
    }, []);

    useEffect(() => {
        fetchProvinceProgress();
    }, [fetchProvinceProgress]);


    return (
        <div className="province-details-container">
            <div className="province-name" onClick={handleResetZoom}>
                <FontAwesomeIcon icon={faChevronLeft} className="province-name-icon" />
                <span>Tỉnh {getProvinceName(allowedProvince, currentProvince)}</span>
            </div>
            <LandmarkSlider setSelectedLandmarkId={setSelectedLandmarkId} landmarks={gamePlay} />
            <div className="province-details-card">
                <Card>
                    <h3>Hành trình khám phá</h3>
                    <div className="progress-bar-container">
                        <img src={star} alt="Sao" />
                        <ProgressBar value={progress?.stars} max={gamePlay?.length * 3}/>
                    </div>
                    <div className="gift-container">
                        <img src={gift} alt="Phần thưởng" />
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </div>

                </Card>
            </div>
        </div>
    )
}
