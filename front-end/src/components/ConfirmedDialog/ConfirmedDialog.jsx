import React from "react";
import "./ConfirmedDialog.css";
import { Button } from '@mui/material';
import { Stars } from "../Stars";

export const ConfirmedDialog = ({ landmark, onClose, onPlay }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{landmark?.landmark_name}</h2>
                    <Stars stars={landmark?.star} />
                </div>

                <div className="modal-body">
                    <div className="score-circle">
                        <span>{landmark?.score}</span>
                        <span>/{landmark?.total_question}</span>
                    </div>

                    <div className="buttons">
                        <Button variant="outlined" color="success" onClick={onClose}>Hủy</Button>
                        <Button variant="contained" color="success" onClick={onPlay}>Chơi</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
