import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';

// 下班倒计时组件
export default function WorkCountdown({ targetHour = 17, targetMinute = 0 }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isWorkOver, setIsWorkOver] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(targetHour, targetMinute, 0, 0);

      // 如果已经过了下班时间，设置为已下班
      if (now >= target) {
        setIsWorkOver(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsWorkOver(false);
      const diff = target - now;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetHour, targetMinute]);

  if (isWorkOver) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-2xl">🎉</span>
        <span className="text-emerald-400 text-sm font-bold">已下班!</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
        下班倒计时
      </span>
      
      <div className="flex items-center gap-1">
        {/* 小时 */}
        <div className="flex flex-col items-center">
          <Counter 
            value={timeLeft.hours} 
            fontSize={24}
            places={[10, 1]}
            gap={1}
            textColor="#10b981"
            fontWeight="bold"
            gradientHeight={4}
            gradientFrom="rgba(0,0,0,0.6)"
          />
        </div>

        <span className="text-lg text-emerald-400 font-bold">:</span>

        {/* 分钟 */}
        <div className="flex flex-col items-center">
          <Counter 
            value={timeLeft.minutes} 
            fontSize={24}
            places={[10, 1]}
            gap={1}
            textColor="#10b981"
            fontWeight="bold"
            gradientHeight={4}
            gradientFrom="rgba(0,0,0,0.6)"
          />
        </div>

        <span className="text-lg text-emerald-400 font-bold">:</span>

        {/* 秒 */}
        <div className="flex flex-col items-center">
          <Counter 
            value={timeLeft.seconds} 
            fontSize={24}
            places={[10, 1]}
            gap={1}
            textColor="#06b6d4"
            fontWeight="bold"
            gradientHeight={4}
            gradientFrom="rgba(0,0,0,0.6)"
          />
        </div>
      </div>

      <span className="text-[10px] text-gray-500">
        🕐 {targetHour}:00 下班
      </span>
    </motion.div>
  );
}

