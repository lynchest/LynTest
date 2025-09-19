import { useState, useCallback, useEffect } from 'react';
import { DetailedStats, TypingStats } from '@/lib/types';

export const useTypingStats = (testDuration: number) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [sessionTotalWords, setSessionTotalWords] = useState(0);
  const [sessionCorrectWords, setSessionCorrectWords] = useState(0);
  const [errorsByChar, setErrorsByChar] = useState<Record<string, number>>({});
  const [errorsByWord, setErrorsByWord] = useState<Record<string, number>>({});
  const [keyDetails, setKeyDetails] = useState<Array<{key: string; time: number; error: boolean}>>([]);
  const [detailedStats, setDetailedStats] = useState<DetailedStats | null>(null);

  const calculateMetrics = useCallback((startTime: number | null) => {
    if (!startTime || sessionTotalWords === 0) return { wpm: 0, accuracy: 100 };

    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const currentWpm = Math.round(sessionCorrectWords / Math.max(timeElapsed, 0.01));
    const currentAccuracy = sessionTotalWords > 0 ? Math.round((sessionCorrectWords / sessionTotalWords) * 100) : 100;
    
    setWpm(currentWpm);
    setAccuracy(currentAccuracy);

    return { wpm: currentWpm, accuracy: currentAccuracy };
  }, [sessionTotalWords, sessionCorrectWords]);

  const generateDetailedStats = (startTime: number | null, finalWpm: number, finalAccuracy: number): DetailedStats => {
    const totalChars = keyDetails.length;
    const avgTime = totalChars > 0 ? keyDetails.reduce((sum, k) => sum + k.time, 0) / totalChars : 0;
    
    const stats: DetailedStats = {
      wpm: finalWpm,
      accuracy: finalAccuracy,
      duration: testDuration,
      totalChars,
      correctChars: totalChars - Object.values(errorsByChar).reduce((sum, v) => sum + v, 0),
      totalWords: sessionTotalWords,
      correctWords: sessionCorrectWords,
      errorsByChar,
      errorsByWord,
      keyDetails,
      avgTimePerChar: avgTime,
    };
    setDetailedStats(stats);
    return stats;
  };

  const recordKey = (key: string, time: number, error: boolean) => {
    setKeyDetails(prev => [...prev, { key, time, error }]);
    if (error) {
      setErrorsByChar(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    }
  };

  const recordWord = (typedWord: string, correctWord: string) => {
    setSessionTotalWords(prev => prev + 1);
    if (typedWord === correctWord) {
      setSessionCorrectWords(prev => prev + 1);
    } else {
      setErrorsByWord(prev => ({ ...prev, [correctWord]: (prev[correctWord] || 0) + 1 }));
    }
  };

  const resetStats = () => {
    setWpm(0);
    setAccuracy(100);
    setSessionTotalWords(0);
    setSessionCorrectWords(0);
    setErrorsByChar({});
    setErrorsByWord({});
    setKeyDetails([]);
    setDetailedStats(null);
  };

  return {
    wpm,
    accuracy,
    detailedStats,
    calculateMetrics,
    generateDetailedStats,
    recordKey,
    recordWord,
    resetStats,
  };
};
