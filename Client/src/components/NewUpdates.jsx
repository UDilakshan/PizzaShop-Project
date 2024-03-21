import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import Bn1 from '../images/Non-veg/Bbq_pizza.png';

const pizzaImages = [Bn1, Bn1, Bn1, Bn1];

function NewUpdates() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className='mt-4'>
      <Slider {...settings} className='flex flex-row' aria-hidden='true'>
        {pizzaImages.map((image, index) => (
          <div key={index} className='flex items-center justify-center w-20 h-20'>
            <img src={image} alt={`Pizza ${index + 1}`} className='h-auto w-auto' />
          </div>
        ))}
      </Slider>
      <div className='flex items-center justify-center w-full bg-black mt-2 md:mt-5 md:py-3 py-2'></div>
    </div>
  );
}

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return <FaAngleLeft className='slick-prev' onClick={onClick} />;
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return <FaAngleRight className='slick-next' onClick={onClick} />;
};

export default NewUpdates;
