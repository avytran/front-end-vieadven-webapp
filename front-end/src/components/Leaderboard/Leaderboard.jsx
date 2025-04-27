import React, { useCallback, useEffect, useState } from 'react';
import './Leaderboard.css';
import { firstRankIcon, secondRankIcon, thirdRankIcon } from '../../assets/images/leaderboard-icons';
import { vietNamHat } from '../../assets/images/item-icons';

import { getTop10, getRankById } from '../../api/leaderboard.service';

const player_id = "US002";
export const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [playerRank, setPlayerRank] = useState([]);

    const fetchData = useCallback(async () => {
        const top10Response = await getTop10();
        setLeaderboard(top10Response.data);
        
        const playerRankResponse = await getRankById(player_id);
        setPlayerRank(playerRankResponse.data[0]);

    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">BẢNG XẾP HẠNG</h1>

            <div className="leaderboard-section">
                <div className="leaderboard-list">
                    {leaderboard?.map((player) => (
                        <div key={player.id} className={`leaderboard-item ${player.rank <= 3 ? `rank-${player.rank}` : 'rank-other'}`}>
                            <div className="player-info">
                                <div className={`rank-badge ${player.rank <= 3 ? `rank-${player.rank}` : 'rank-other'}`}>
                                    {player.rank <= 3 ? (
                                        <div className="medal">
                                            {player.rank === 1 ? (
                                                <img src={firstRankIcon} alt="First Place" className="rank-icon" />
                                            ) : player.rank === 2 ? (
                                                <img src={secondRankIcon} alt="Second Place" className="rank-icon" />
                                            ) : (
                                                <img src={thirdRankIcon} alt="Third Place" className="rank-icon" />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="number-rank">{player.rank}</div>
                                    )}
                                </div>
                                <div className="avatar"></div>
                                <div className={`player-name ${player.id <= 3 ? `rank-${player.id}` : 'rank-other'}`}>{player.name}</div>
                            </div>
                            <div className="points-container">
                                <span className={`points ${player.id <= 3 ? `rank-${player.id}` : 'rank-other'}`}>{player.points}</span>
                                <img src={vietNamHat} alt="Vietnam Hat" className="icon-image vietnam-hat" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="player-info-container">
                    <div className="player-rank-container">
                        <h2 className="player-rank-title">Thứ hạng của tôi</h2>
                        <div className="player-rank-content">
                            <div className="player-rank-circle">
                                <span>{playerRank.rank}</span>
                            </div>
                            <div className="player-points-container">
                                <span className="player-points">{playerRank.total_score}</span>
                                <img src={vietNamHat} alt="Vietnam Hat" className="icon-image vietnam-hat" />
                            </div>
                        </div>
                    </div>

                    <div className="player-achievement-container">
                        <h2 className="player-achievement-title">Thành tựu</h2>
                        <div className="player-achievement-content">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};