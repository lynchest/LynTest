import { useState, useEffect } from 'react';
import { TypingStats } from '@/lib/types';

export const useTypingHistory = () => {
  const [history, setHistory] = useState<TypingStats[]>([]);

  // Load history from localStorage on hook initialization
  useEffect(() => {
    const savedHistory = localStorage.getItem('typingHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: Omit<TypingStats, 'timestamp'> & { timestamp: string }) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error parsing typing history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    // İlk yüklemede boş geçmişin üzerine yazmayı önlemek için kontrol ekliyoruz.
    // Sadece kullanıcı bir test tamamladığında geçmişi kaydedeceğiz.
    // Bu useEffect'i addHistoryEntry'ye bırakmak daha mantıklı olabilir,
    // ancak şimdilik bu şekilde bırakıyorum.
    localStorage.setItem('typingHistory', JSON.stringify(history));
  }, [history]);

  const addHistoryEntry = (stats: TypingStats) => {
    setHistory(prev => [stats, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  return { history, addHistoryEntry };
};
