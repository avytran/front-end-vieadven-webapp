import React from 'react'
import './Stars.css';
import { star, blackStar } from '../../assets/images/card-icons';

export const Stars = ({ stars }) => {
  let blackStars = 0;
  let goldenStars = 0;

  switch (stars) {
    case 0:
      blackStars = 3;
      break;
    case 1:
      blackStars = 2;
      goldenStars = 1;
      break;
    case 2:
      blackStars = 1;
      goldenStars = 2;
      break;
    case 3:
      goldenStars = 3;
      break;
    default:
      break;
  }

  if (blackStars === 0 && goldenStars === 0) {
    return null;
  }

  return (
    <div className="stars-container">
      {Array.from({ length: goldenStars }, (_, index) => (
        <img key={index} src={star} alt="golden star" className="star" />
      ))}
      {Array.from({ length: blackStars }, (_, index) => (
        <img key={index} src={blackStar} alt="black star" className="star" />
      ))}
    </div>
  )
  
}
