import { useState, useCallback } from 'react';
import { DetailedStats, Finger, FingerStats, DifficultyAnalysis } from '@/lib/types';
import { fingerMappings, type Language } from '@/lib/languages';

const initialFingerStats: Record<Finger, FingerStats> = {
  leftPinky: { errors: 0, totalChars: 0, speed: 0 },
  leftRing: { errors: 0, totalChars: 0, speed: 0 },
  leftMiddle: { errors: 0, totalChars: 0, speed: 0 },
  leftIndex: { errors: 0, totalChars: 0, speed: 0 },
  leftThumb: { errors: 0, totalChars: 0, speed: 0 },
  rightThumb: { errors: 0, totalChars: 0, speed: 0 },
  rightIndex: { errors: 0, totalChars: 0, speed: 0 },
  rightMiddle: { errors: 0, totalChars: 0, speed: 0 },
  rightRing: { errors: 0, totalChars: 0, speed: 0 },
  rightPinky: { errors: 0, totalChars: 0, speed: 0 },
};

export const useTypingStats = (testDuration: number, language: Language) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [sessionTotalWords, setSessionTotalWords] = useState(0);
  const [sessionCorrectWords, setSessionCorrectWords] = useState(0);
  const [errorsByChar, setErrorsByChar] = useState<Record<string, number>>({});
  const [errorsByWord, setErrorsByWord] = useState<Record<string, number>>({});
  const [keyDetails, setKeyDetails] = useState<Array<{key: string; time: number; error: boolean}>>([]);
  const [detailedStats, setDetailedStats] = useState<DetailedStats | null>(null);

  // New stats
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [fingerStats, setFingerStats] = useState<Record<Finger, FingerStats>>(initialFingerStats);

  const calculateMetrics = useCallback((startTime: number | null) => {
    if (!startTime || sessionTotalWords === 0) return { wpm: 0, accuracy: 100 };

    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const currentWpm = Math.round(sessionCorrectWords / Math.max(timeElapsed, 0.01));
    const currentAccuracy = sessionTotalWords > 0 ? Math.round((sessionCorrectWords / sessionTotalWords) * 100) : 100;
    
    setWpm(currentWpm);
    setAccuracy(currentAccuracy);

    return { wpm: currentWpm, accuracy: currentAccuracy };
  }, [sessionTotalWords, sessionCorrectWords]);

  const generateDetailedStats = (
    finalWpm: number, 
    finalAccuracy: number,
    sourceText: string
  ): DetailedStats => {
    const totalChars = keyDetails.filter(k => k.key !== 'Backspace').length;
    const avgTime = totalChars > 0 ? keyDetails.reduce((sum, k) => sum + k.time, 0) / totalChars : 0;

    // Calculate finger speeds
    const fingerTimes = (Object.keys(initialFingerStats) as Finger[]).reduce((acc, finger) => {
      acc[finger] = { totalTime: 0, count: 0 };
      return acc;
    }, {} as Record<Finger, { totalTime: number; count: number }>);
    const mapping = fingerMappings[language];
    keyDetails.forEach(k => {
      const finger = mapping[k.key as keyof typeof mapping] as Finger;
      if (finger) {
        fingerTimes[finger].totalTime += k.time;
        fingerTimes[finger].count++;
      }
    });

    const finalFingerStats = {...fingerStats};
    for (const f in fingerTimes) {
      const finger = f as Finger;
      if (fingerTimes[finger].count > 0) {
        finalFingerStats[finger].speed = fingerTimes[finger].totalTime / fingerTimes[finger].count;
      }
    }

    // Calculate difficulty analysis
    const words = sourceText.split(' ');
    const difficultyAnalysis: DifficultyAnalysis = {
      averageWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
      punctuationCount: (sourceText.match(/[.,/#!$%^&*;:{}=\-_`~()]/g) || []).length,
      numberCount: (sourceText.match(/[0-9]/g) || []).length,
      performanceByWordLength: {}, // Placeholder for now
    };
    
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
      timestamp: new Date(),
      backspaceCount,
      extraChars,
      missedChars,
      fingerStats: finalFingerStats,
      difficultyAnalysis,
    };
    setDetailedStats(stats);
    return stats;
  };

  const recordKey = (key: string, time: number, error: boolean) => {
    if (key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
      return; // Don't record backspace in keyDetails for stat purposes
    }

    setKeyDetails(prev => [...prev, { key, time, error }]);
    
    const mapping = fingerMappings[language];
    const finger = mapping[key as keyof typeof mapping] as Finger;

    if (finger) {
      setFingerStats(prev => ({
        ...prev,
        [finger]: {
          ...prev[finger],
          totalChars: prev[finger].totalChars + 1,
          errors: prev[finger].errors + (error ? 1 : 0),
        }
      }));
    }

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
      
      // Calculate missed and extra characters for incorrect words
      let missed = 0;
      let extra = 0;
      if (typedWord.length > correctWord.length) {
        extra = typedWord.length - correctWord.length;
      } else {
        missed = correctWord.length - typedWord.length;
      }
      
      for (let i = 0; i < Math.min(typedWord.length, correctWord.length); i++) {
        if (typedWord[i] !== correctWord[i]) {
          // This logic can be more complex, for now we just count length differences
        }
      }
      setExtraChars(prev => prev + extra);
      setMissedChars(prev => prev + missed);
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
    setBackspaceCount(0);
    setExtraChars(0);
    setMissedChars(0);
    setFingerStats(initialFingerStats);
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
