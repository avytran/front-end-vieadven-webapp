import React from 'react';
import './Leaderboard.css';
import { vietnamHatIcon } from '../../assets/images/daily-mission-icons';
import { firstRankIcon, secondRankIcon, thirdRankIcon } from '../../assets/images/leaderboard-icons';

export const Leaderboard = () => {
    const leaderboardData = [
        { id: 1, name: "Aztec", points: 1000 },
        { id: 2, name: "Name", points: 500 },
        { id: 3, name: "Name", points: 200 },
        { id: 4, name: "Name", points: 100 },
        { id: 5, name: "Name", points: 100 },
        { id: 6, name: "Name", points: 100 },
        { id: 7, name: "Name", points: 100 },
        { id: 8, name: "Name", points: 100 },
        { id: 9, name: "Name", points: 100 },
        { id: 10, name: "Name", points: 100 },
        { id: 11, name: "Name", points: 100 },
        { id: 12, name: "Name", points: 100 },
        { id: 13, name: "Name", points: 100 },
        { id: 14, name: "Name", points: 100 },
        { id: 15, name: "Name", points: 100 }
    ];

    const playerData = {
        rank: 100,
        points: 20
    };

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">BẢNG XẾP HẠNG</h1>

            <div className="leaderboard-section">
                <div className="leaderboard-list">
                    {leaderboardData.map((player) => (
                        <div key={player.id} className={`leaderboard-item ${player.id <= 3 ? `rank-${player.id}` : 'rank-other'}`}>
                            <div className="player-info">
                                <div className={`rank-badge ${player.id <= 3 ? `rank-${player.id}` : 'rank-other'}`}>
                                    {player.id <= 3 ? (
                                        <div className="medal">
                                            {player.id === 1 ? (
                                                <img src={firstRankIcon} alt="First Place" className="rank-icon" />
                                            ) : player.id === 2 ? (
                                                <img src={secondRankIcon} alt="Second Place" className="rank-icon" />
                                            ) : (
                                                <img src={thirdRankIcon} alt="Third Place" className="rank-icon" />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="number-rank">{player.id}</div>
                                    )}
                                </div>
                                <div className="avatar"></div>
                                <div className={`player-name ${player.id <= 3 ? `rank-${player.id}` : 'rank-other'}`}>{player.name}</div>
                            </div>
                            <div className="points-container">
                                <span className={`points ${player.id <= 3 ? `rank-${player.id}` : 'rank-other'}`}>{player.points}</span>
                                <img src={vietnamHatIcon} alt="Vietnam Hat" className="icon-image vietnam-hat" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="player-info-container">
                    <div className="player-rank-container">
                        <h2 className="player-rank-title">Thứ hạng của tôi</h2>
                        <div className="player-rank-content">
                            <div className="player-rank-circle">
                                <span>{playerData.rank}</span>
                            </div>
                            <div className="player-points-container">
                                <span className="player-points">{playerData.points}</span>
                                <img src={vietnamHatIcon} alt="Vietnam Hat" className="icon-image vietnam-hat" />
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