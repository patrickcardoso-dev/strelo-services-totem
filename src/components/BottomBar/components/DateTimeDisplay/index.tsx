'use client';

import { useState, useEffect } from 'react';

import './styles.css';

export default function DateTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const formatedDate = currentTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'short',
    day: '2-digit',
  });

  const formatedHour = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="date-time-display">
      <span className="date-display">{formatedDate}</span>
      <span className="hour-display">{formatedHour}</span>
    </div>
  );
}
