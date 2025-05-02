
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const { t } = useLanguage();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // SIFIA event date - July 16, 2025
    const targetDate = new Date('2025-07-16T09:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        // Event has started
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      setTimeRemaining({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };
    
    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-2 md:p-4 bg-white rounded-lg shadow-md min-w-20 md:min-w-24">
      <span className="text-2xl md:text-4xl font-bold text-sifia-blue">{value}</span>
      <span className="text-xs md:text-sm text-gray-600">{label}</span>
    </div>
  );

  return (
    <div className="bg-sifia-gold bg-opacity-20 rounded-xl p-6">
      <h3 className="text-center text-xl md:text-2xl font-semibold text-sifia-blue mb-4">
        {t('countdownTitle')}
      </h3>
      <div className="flex justify-center space-x-3 md:space-x-6">
        <CountdownBox value={timeRemaining.days} label={t('days')} />
        <CountdownBox value={timeRemaining.hours} label={t('hours')} />
        <CountdownBox value={timeRemaining.minutes} label={t('minutes')} />
        <CountdownBox value={timeRemaining.seconds} label={t('seconds')} />
      </div>
    </div>
  );
};

export default CountdownTimer;
