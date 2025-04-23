import React, { useCallback, useEffect, useState } from 'react';
import './ProvinceDetails.css';
import { LandmarkSlider } from '../LandmarkSlider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../Card";
import { ProgressBar } from '../ProgressBar';
import { star, gift } from '../../assets/images/card-icons';
import { getProvinceProgress } from '../../api/provinceProgress.service';

export const ProvinceDetails = ({ landmarks, provinceName, handleResetZoom }) => {
    const [progress, setProgress] = useState({});
    
    const fetchProvinceProgress = useCallback(async () => {
        try {
            const response = await getProvinceProgress("vn-ls", "US001");
            setProgress(response.data);
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
                <span>Tỉnh {provinceName}</span>
            </div>
            <LandmarkSlider landmarks={landmarks} />
            <div className="province-details-card">
                <Card>
                    <h3>Hành trình khám phá</h3>
                    <div className="progress-bar-container">
                        <img src={star} alt="Sao" />
                        <ProgressBar value={progress?.stars} max={landmarks?.length * 3}/>
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
