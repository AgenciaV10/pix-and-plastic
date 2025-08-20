import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownBarProps {
  duration?: number; // duration in minutes
  text?: string;
}

export function CountdownBar({ duration = 15, text = "Oferta por tempo limitado" }: CountdownBarProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-checkout-warning text-checkout-warning-foreground py-3 px-[0.4rem] md:px-4">
      <div className="container mx-auto max-w-md flex items-center justify-center gap-2 text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>{text}</span>
        <span className="font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}