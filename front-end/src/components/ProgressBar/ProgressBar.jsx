import React from 'react';
import './ProgressBar.css';

export const ProgressBar = ({ value, max = 100 }) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar">
        <div className="progress-target">{value}/{max}</div>
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
