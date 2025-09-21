import { useState, useEffect } from 'react';
import { DetailedStats } from '@/lib/types';

export const useTypingHistory = () => {
  const [history, setHistory] = useState<DetailedStats[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('typingHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: Omit<DetailedStats, 'timestamp'> & { timestamp: string }) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error parsing typing history:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('typingHistory', JSON.stringify(history));
    }
  }, [history]);

  const addHistoryEntry = (stats: DetailedStats) => {
    setHistory(prev => [stats, ...prev.slice(0, 29)]);
  };

  return { history, addHistoryEntry };
};
