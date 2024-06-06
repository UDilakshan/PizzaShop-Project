import React,{Component} from 'react';
import { useStateValue } from '../context/StateProvider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Loader from '../Dashboard/Loader';


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={className}
    style={{
      ...style,
      display: "flex",
      alignItems:"center",
      justifyContent:"center",
      background: "rgb(20 83 45)",
      width: "20px",
      height: "20px",
      borderRadius: "10%",
      fontSize: "20px", 
    }}
    onClick={onClick}
  />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        background: "rgb(20 83 45)",
        width: "20px",
        height: "20px",
        borderRadius: "10%",
        fontSize: "20px", 
      }}
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        }
      },
       
      {
        breakpoint: 640,
        settings: {
          nextArrow: false , 
          prevArrow: false ,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };

  const navigate = useNavigate();

  const [{ foodItems }] = useStateValue();

  const data = foodItems ? foodItems.filter(n => n.category === "New Updates") : [];

  if (!data || data.length === 0 ) {
    return <div className='flex items-end justify-center my:[30%] md:my-[20%]'>
      <Loader /><span className='text-lg text-black'>Processing...</span>
    </div>;
  }

  return(
    <>
    <div className='flex flex-row'>
      <div className='md:w-[92%] md:h-[300px] w-full h-auto mx-auto '>
        <div>  
            <Slider {...settings}>
              {
                data && data.map(item => (  
                  <>
                      {/* for images  */}
                      <motion.div key={item?.id} className='w-auto flex items-center justify-center'>
                          <img src={item?.imageURL} alt="Pizza Images" className='h-auto max-h-24 w-auto md:w-auto md:h-[300px] md:max-h-[300px] flex items-center justify-center rounded-xl cursor-pointer' onClick={() => navigate('/offers')} whileTap={{scale:0.9}}/>
                          
                      </motion.div>
                  </>            
                ))} 
                </Slider>
        </div>
    </div>    
  </div>
            <div className='flex items-center justify-center w-full bg-black mt-2 md:mt-5 md:py-3 py-2'></div>
    </>
  )}


export default NewUpdates;