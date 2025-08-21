import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  type: 'minutes' | 'hours' | 'fixed';
  backgroundColor: string;
  textColor: string;
  duration: string; // Format: HH:MM:SS
  activeText: string;
  finishedText: string;
  stickyTop: boolean;
  className?: string;
}

export function CountdownTimer({
  type,
  backgroundColor,
  textColor,
  duration,
  activeText,
  finishedText,
  stickyTop,
  className = ''
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  // Parse duration string to seconds
  const parseDuration = (durationStr: string): number => {
    const [hours, minutes, seconds] = durationStr.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
  };

  // Initialize timer
  useEffect(() => {
    const totalSeconds = parseDuration(duration);
    setTimeLeft(totalSeconds);
    setIsFinished(totalSeconds <= 0);
  }, [duration]);

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);
  const displayText = isFinished ? finishedText : activeText;

  const containerClasses = `
    w-full p-4 text-center transition-all duration-300
    ${stickyTop ? 'sticky top-0 z-50 shadow-lg' : ''}
    ${className}
  `.trim();

  return (
    <div 
      className={containerClasses}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-sm md:text-base font-medium mb-2">
          {displayText}
        </div>
        
        {!isFinished && (
          <div className="flex gap-1 md:gap-2 text-xl md:text-2xl font-bold justify-center items-center">
            <div className="flex flex-col items-center">
              <span className="bg-black bg-opacity-20 px-2 md:px-3 py-1 md:py-2 rounded min-w-[40px] md:min-w-[50px]">
                {hours}
              </span>
              <span className="text-xs mt-1 opacity-75">H</span>
            </div>
            <span className="text-2xl md:text-3xl">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-black bg-opacity-20 px-2 md:px-3 py-1 md:py-2 rounded min-w-[40px] md:min-w-[50px]">
                {minutes}
              </span>
              <span className="text-xs mt-1 opacity-75">M</span>
            </div>
            <span className="text-2xl md:text-3xl">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-black bg-opacity-20 px-2 md:px-3 py-1 md:py-2 rounded min-w-[40px] md:min-w-[50px]">
                {seconds}
              </span>
              <span className="text-xs mt-1 opacity-75">S</span>
            </div>
          </div>
        )}
        
        {isFinished && (
          <div className="text-lg md:text-xl font-bold animate-pulse">
            ⏰ {finishedText}
          </div>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;