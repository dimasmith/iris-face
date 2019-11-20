import React, {useState, useEffect, cloneElement} from 'react';

export function Interval(props) {
  const interval = props.interval || 1000;
  const time = new Date();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), interval);

    return function stopTimer() {
      clearInterval(timer);
    }
  }, [counter]);

  return (
    <div className={`counter-${counter}`}>
      {cloneElement(props.children, {time})}
      <footer>Updated on {new Date().toISOString()}</footer>
    </div>);
}