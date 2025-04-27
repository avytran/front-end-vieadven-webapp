import React, { useCallback, useState, useEffect } from 'react';
import './MissionPage.css';
import { useNavigate } from 'react-router-dom';
import { getPlayerItem } from '../../api/playerItem.service';
import { getPlayerMission } from '../../api/playerMission.service';
import { Item } from '../../components/Item';
import { MissionCard } from '../../components/MissionCard';

const player_id = "US002"

export const MissionPage = () => {
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    const [missions, setMissions] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const responseItem = await getPlayerItem(player_id);
            setItem(responseItem.data[0]);

            const responseMission = await getPlayerMission(player_id);
            setMissions(responseMission.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleStartChallenge = () => {
        navigate('/');
    }

    return (
        <div className="daily-container">
            <div className="header">
                <h1>NHIỆM VỤ HẰNG NGÀY</h1>
                <div className="counters">
                    <div className="counter">
                        <Item item={item} />
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="missions-container">
                    <div className="mission-list">
                        {missions.map(mission => {
                            return (
                                <MissionCard key={mission.mission_id} mission={mission} />
                            );
                        })}
                    </div>
                </div>

                <div className="challenge-section">
                    <h2>Thực hiện thử thách nào!</h2>
                    <p>Hoàn thành các thử thách hằng ngày để giành được huy hiệu độc đáo</p>
                    <button onClick={handleStartChallenge} className="start-button">BẮT ĐẦU HỌC</button>
                </div>
            </div>
        </div>
    );
};