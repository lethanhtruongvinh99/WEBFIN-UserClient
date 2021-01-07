import React from "react";
import { useState, useEffect } from "react";

const Timer = (props) => {
  const [state, setState] = useState({ time: {}, seconds: 0 });
  const [counter, setCounter] = useState(120);
  const [isStop, setStop] = useState(false);
  useEffect(() => {
    const timer =
      isStop === false &&
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
        setState({
          time: secondsToTime(counter - 1),
          seconds: counter - 1,
        });
      }, 1000);
    return () => clearInterval(timer);
  }, [state.time]);

  const stopTimer = () => {
    setStop(true);
  };
  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };
  return (
    <div>
      {" "}
      <button onClick={stopTimer}>Stop</button>
      {state.time.h ? state.time.h + "h : " : ""}
      {state.time.m? state.time.m + "m : " : ""}
      {state.time.s? state.time.s + "s" : ""}
    </div>
  );
};

export default Timer;
