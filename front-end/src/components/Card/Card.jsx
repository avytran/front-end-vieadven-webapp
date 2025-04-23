import React from 'react';
import './Card.css';

export const Card = ({ children }) => {
  return (
    <div className='card-container'>
        {children}
    </div>
  )
}