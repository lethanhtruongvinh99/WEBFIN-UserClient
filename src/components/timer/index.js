import React from "react";
import { useState, useEffect } from "react";

const Timer = (props) =>
{
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const isActive = props.isStart;
  const [counter, setCounter] = useState(props.timePerTurn);

  useEffect(() =>
  {
    let intervalId;

    if (isActive)
    {
      intervalId = setInterval(() =>
      {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        if (counter > 0) setCounter((counter) => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);


  return (
    <div className="container">
      <div className="time">
        <span className="minute">{minute}</span>
        <span> : </span>
        <span className="second">{second}</span>
      </div>
    </div>
  );
};

export default Timer;
