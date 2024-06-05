import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  finishLoading: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showFirstCircle, setShowFirstCircle] = useState(false);
  const [showSecondCircle, setShowSecondCircle] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShowFirstCircle(true);
    }, 100);

    const timeout2 = setTimeout(() => {
      setShowSecondCircle(true);
    }, 600);

    const timeout3 = setTimeout(() => {
      setShowArrow(true);
    }, 1000);

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 10);

    setTimeout(() => {
      finishLoading();
    }, 2000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {isMounted && (
        <div className='min-h-screen bg-[#0EA5E9] flex justify-center items-center'>
          <div className='flex flex-col items-center'>
            <div className='flex gap-10'>
              <div
                className={`border-solid rounded-full lg:w-24 lg:h-24 w-20 h-20 border-white border-[15px] ${
                  showFirstCircle ? 'visible transition duration-500 opacity-100' : 'opacity-0'
                }`}
              />
              <div
                className={`border-solid rounded-full lg:w-24 lg:h-24 w-20 h-20 border-white border-[15px] ${
                  showSecondCircle ? 'visible transition duration-500 opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            <div className={`lg:-ml-2 -mt-1 ${showArrow ? 'visible transition duration-500 opacity-100' : 'opacity-0'}`}>
              <Image 
                src="/images/arrow.png" 
                width={143} 
                height={45.4} 
                alt='' 
                className='w-[143px] h-[45.4px] sm:w-[100px] sm:h-[30px] md:w-[120px] md:h-[38px]'
              />
            </div>
            <h1 id='title' data-text="FA&nbsp;Visualizer" className={`title`}>fa visualizers</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
