/* This is for showing categories images only */

import React, {useState} from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from './Loader';
import MenuContainer from '../Container/MenuContainer';
import { useStateValue } from '../context/StateProvider';

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
              background: "#1c1917",
              width: "40px",
              height: "40px",
              borderRadius: "25%",
              fontSize: "30px", 
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
              background: "#1c1917",
              width: "40px",
              height: "40px",
              borderRadius: "25%",
              fontSize: "30px", 
            }}
            onClick={onClick}
          />
        );
      } 

const RowContainer = ({ flag,data }) => { 
      const settings = {
      infinite: false,
      dots: true,
      draggable:true,
      swipe:true,
      swipeToSlide:true,
      arrows: true, 
      speed: 500,
      nextArrow: <SampleNextArrow /> , 
      prevArrow: <SamplePrevArrow /> , 
      slidesToShow: 5,
      slidesToScroll: 2,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            nextArrow: false , 
            prevArrow: false ,
            slidesToShow: 3,
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
            initialSlide: 0,
          }
        }
      ]

    };

    const [filter, setFilter] = useState("OPizza Offers");
    const [{foodItems}, dispatch] = useStateValue();
  

    if (!data || data.length === 0) {
      return <div className='flex items-end justify-center mt-20'>
      <Loader /><span className='text-lg text-pink-600'>Processing...</span>
      </div>; 
    }

  return (
    <div className={`flex items-center justify-center md:my-8 ${flag 
      ? 'overflow-x-scroll scrollbar-none' 
      : 'overflow-x-hidden flex-wrap scroll-smooth'} `}>  
      
        <div className='md:w-[92%] w-full mx-auto my-8 md:mt-4'>
            <Slider {...settings} > 
              { 
                data && data.map(item => (
                  <motion.div className= 'w-full h-auto flex flex-col'>
                    <div key={item?.id} className='w-full h-auto flex items-center justify-center'>
                      <motion.img
                        src={item?.imageURL}
                        alt='image'
                        className={`${filter===item.category ? 'bg-red-500' : 'bg-white'} cursor-pointer md:w-40 w-36 h-auto rounded-md hover:drop-shadow-xl`}
                        initial={{ scale: 1 }}
                        animate={item.category === 'Offers' ? { scale: [0.9, 0.7, 0.9], transition: { duration: 1.0, repeat: Infinity } } : { scale: 1 }}
                        exit={{ scale: 1 }}
                        whileTap={{scale:0.8}}
                        onClick={()=> setFilter(item?.title)}                    
                      />
                    </div>
                    <div className='w-full items-center justify-center flex flex-col'>
                      <p className='text-teal-900 font-semibold text-lg md:text-xl'>{item?.title}</p>
                    </div>
                  </motion.div>                       
              ))}
              </Slider>          
        </div>

        <div className='w-full'>                 
            <MenuContainer flag={false} data ={foodItems?.filter(n=> n.category == filter)}/>
        </div> 
      
  </div>                            
  );
}

export default RowContainer;