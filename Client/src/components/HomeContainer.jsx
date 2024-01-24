import React, { useState, useEffect } from 'react';
import Bn1 from "../images/Bn.gif";
import Bn2 from "../images/Pizza2.png";
import Bn3 from "../images/Pizza3.png";
import Bn4 from "../images/Pizza4.png";


const pizzaImages = [Bn1,Bn2,Bn3,Bn4];

function HomeContainer() {
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState(0);

  useEffect(() => {
    // Interval to switch to the next pizza image every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentPizzaIndex((prevIndex) => (prevIndex + 1) % pizzaImages.length);
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const goToPrevious = () => {
    setCurrentPizzaIndex((prevIndex) => (prevIndex - 1 + pizzaImages.length) % pizzaImages.length);
  };

  const goToNext = () => {
    setCurrentPizzaIndex((prevIndex) => (prevIndex + 1) % pizzaImages.length);
  };

  const goToIndex = (index) => {
    setCurrentPizzaIndex(index);
  };

  return (
    <div >
      <div>
      {/* Show the current pizza image based on the index */}
      <div className='flex flex-row'>
        {pizzaImages.map((pizza, index) => (
          <div
            key={index}
            className={`w-auto md:w-500 h-full md:h-50  ${index === currentPizzaIndex ? '' : 'hidden'}`}
          >
             <img src={pizza} className='w-full h-full object-cover rounded-md' alt={`pizza-${index + 1}`} />
           </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div style={{ textAlign: 'center', marginTop: '10px' }} >
        {pizzaImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentPizzaIndex ? 'active' : ''}`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>

      {/* Order Now button rendered outside the map function */}
      <button type='button' className='bg-gradient-to-br from-black to-black w-full px-4 py-2 text-white mt-5'>
        Order Now
      </button>
      </div>
    </div>
  );
}

export default HomeContainer;
