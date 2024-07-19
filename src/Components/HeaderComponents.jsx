import React, { useState, useEffect } from 'react';
import "./HeaderComponents.css"

const HeaderComponent = () => {
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [elapsedHours, setElapsedHours] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        const currentDate = new Date();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();

        setElapsedHours(currentHours - startHours);
        setElapsedMinutes(currentMinutes - startMinutes);
        setElapsedSeconds(currentSeconds - startSeconds);
      }, 1000);
    } else {
      // Clear the interval when timer stops
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, [timerRunning, startHours, startMinutes, startSeconds]);

  const handleStart = () => {
    const currentDate = new Date();
    setStartHours(currentDate.getHours());
    setStartMinutes(currentDate.getMinutes());
    setStartSeconds(currentDate.getSeconds());
    setTimerRunning(true);
  };

  const handleStop = () => {
    setTimerRunning(false);
  };
  
  const handleReset = () => {
    setStartHours(0);
    setStartMinutes(0);
    setStartSeconds(0);
    setElapsedHours(0);
    setElapsedMinutes(0);
    setElapsedSeconds(0);
    setTimerRunning(false);
  };

  const formatTimeUnit = (unit) => unit.toString().padStart(2, '0');

  return (
    <section className="main-container">
      <h1 className='elapsed-time'>{formatTimeUnit(elapsedHours)}:{formatTimeUnit(elapsedMinutes)}:{formatTimeUnit(elapsedSeconds)}</h1>
      <div className="container">
        <p><button onClick={handleStart} disabled={timerRunning} className='buttons'>Start</button></p>
        <p><button onClick={handleStop} disabled={!timerRunning} className='buttons'>Stop</button></p>
        <p><button onClick={handleReset} disabled={!timerRunning && (elapsedHours === 0 && elapsedMinutes === 0 && elapsedSeconds === 0)} className='buttons'>Reset</button></p>
      </div>
    </section>
  );
}

export default HeaderComponent;