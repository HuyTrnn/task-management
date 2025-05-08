import React, { useState, useEffect } from 'react';

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = days[currentTime.getDay()];
    const month = months[currentTime.getMonth()];
    const dateNum = currentTime.getDate();
    
    return `${day}, ${month} ${dateNum}`;
  };

  const getFormattedTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <p className="text-gray-600 font-medium">My Days</p>
      <div className="flex items-center">
        <span className="text-blue-600 font-medium min-w-[80px]"> {getFormattedTime()}, </span>
        <span className="text-gray-800">{getFormattedDate()}</span>
      </div>
    </div>
  );
};

export default Time; 