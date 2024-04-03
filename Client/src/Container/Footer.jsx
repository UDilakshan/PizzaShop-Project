import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const distanceFromBottom = documentHeight - (windowHeight + scrollTop);
      const triggerDistance = 100;
      setShowFooter(distanceFromBottom < triggerDistance);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <div className={`z-40 fixed bottom-0 w-full h-32 bg-black ${showFooter ? 'opacity-100 translate-y-0 transition-transform duration-100 ease-in' : 'opacity-0 -translate-y-full transition-transform duration-500 ease-out'} cursor-pointer text-red-100`}>
      <p className='flex items-center justify-center pt-12'>Footer</p>
    </div>
  );
};

export default Footer;
