import React from 'react';
import './LandmarkSlider.css';
import Slider from "react-slick";
import { LandmarkCard } from '../LandmarkCard';

export const LandmarkSlider = ({ landmarks }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "7vw",
    initialSlide: 0,
    prevArrow: <></>,
    responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 2.5, slidesToScroll: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 2.5, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 2.5, slidesToScroll: 1 } }
    ]
};
  return (
    <div className='landmark-slider-container'>
      <Slider {...settings}>
        {landmarks?.map((item, index) => (
          <LandmarkCard key={'landmark-card' + index} landmark={item} />
        ))}
      </Slider>
    </div>
  )
}
