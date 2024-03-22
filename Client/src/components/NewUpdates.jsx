import React, {Component} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

import Bn1 from "../images/ShowCaseImages/Pizza1.gif";
import Bn2 from "../images/ShowCaseImages/Pizza2.png";
import Bn3 from "../images/ShowCaseImages/Pizza3.png";
import Bn4 from "../images/ShowCaseImages/Pizza4.png";


const pizzaImages = [Bn1,Bn2,Bn3,Bn4];


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
} 



function NewUpdates() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "Ease-In-Out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
       
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const navigate = useNavigate();


  return(
    <>
    <div className='flex flex-row'>
      <div className='md:w-[90%] md:h-[300px] w-60 h-24 ml-10 md:ml-14'>
        <div>  
            <Slider {...settings}>
              {
                pizzaImages.map((image, index) => (  
                  <>
                      {/* for images  */}
                      <motion.div key={index} className='w-auto flex items-center justify-center'>
                          <img src={image} alt="Pizza Images" className='h-24 max-h-24 w-auto md:w-auto md:h-[300px] md:max-h-[300px] flex items-center justify-center cursor-pointer'/>
                      </motion.div>
                  </>            
                ))} 
                </Slider>
        </div>
    </div>    
  </div>
            <div className='flex items-center justify-center w-full bg-black mt-2 md:mt-5 md:py-3 py-2'></div>
    </>
  

    
  )

}


export default NewUpdates;
