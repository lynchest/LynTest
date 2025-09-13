import { useState, useEffect, useRef } from 'react';
import { generateRandomText, type Language } from '@/lib/languages';
import { useTypingStats } from './useTypingStats';
import { DetailedStats } from '@/lib/types';

const TEST_DURATION = 60;

export const useTypingGame = (onTestComplete: (stats: DetailedStats) => void) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('typingLanguage');
    return (saved as Language) || 'en';
  });

  const generateNewLine = (lang: Language) => 
    generateRandomText(48, lang).split(/\s+/).filter(word => word.length > 0);

  const [lines, setLines] = useState<string[][]>(() => [
    generateNewLine(language),
    generateNewLine(language),
    generateNewLine(language),
  ]);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index within the current line (lines[0])
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [typedWordsInLine, setTypedWordsInLine] = useState<string[]>([]);
  const [hasTestCompletedBeenCalled, setHasTestCompletedBeenCalled] = useState(false);
  const [currentLineTotalChars, setCurrentLineTotalChars] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const lastChangeTime = useRef<number | null>(null);

  const stats = useTypingStats(TEST_DURATION);

  // Dil tercihini kaydet
  useEffect(() => {
    localStorage.setItem('typingLanguage', language);
  }, [language]);

  // Zamanlayıcı mantığı
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Metrikleri hesapla
  useEffect(() => {
    if (isActive) {
      stats.calculateMetrics(startTime);
    }
  }, [isActive, startTime, stats]);

  // Test tamamlandığında
  useEffect(() => {
    if (isCompleted && !hasTestCompletedBeenCalled) {
      const { wpm, accuracy } = stats.calculateMetrics(startTime);
      if (wpm > 0) { // Sadece geçerli bir sonuç varsa kaydet
        const detailed = stats.generateDetailedStats(startTime, wpm, accuracy);
        onTestComplete(detailed);
        setHasTestCompletedBeenCalled(true); // Sadece bir kez çağrıldığından emin ol
      }
    }
  }, [isCompleted, onTestComplete, startTime, stats, hasTestCompletedBeenCalled]);

  const startTest = () => {
    if (isCompleted) return;
    lastChangeTime.current = null;
    setIsActive(true);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };

  const renewText = (lang: Language = language) => {
    const newLines = [
      generateNewLine(lang),
      generateNewLine(lang),
      generateNewLine(lang),
    ];
    setLines(newLines);
    setCurrentWordIndex(0);
    setTypedWordsInLine([]);
    setUserInput('');
    setCurrentLineTotalChars(newLines[0].join('').length); // İlk satırın toplam harf sayısını hesapla
  };

  const restartTest = (lang: Language = language) => {
    setIsActive(false);
    setIsCompleted(false);
    setTimeLeft(TEST_DURATION);
    setStartTime(null);
    setHasTestCompletedBeenCalled(false); // Yeni test için sıfırla
    stats.resetStats();
    renewText(lang);
    inputRef.current?.focus();
  };

  const changeLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'tr' : 'en';
    setLanguage(newLanguage);
    restartTest(newLanguage);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) {
      startTest();
    }
    if (isCompleted) return;
  
    const value = e.target.value;
    const now = Date.now();
  
    if (lastChangeTime.current !== null && value.length > userInput.length) {
      const newChar = value.slice(-1);
      const duration = now - lastChangeTime.current;
      const currentWord = lines[0]?.[currentWordIndex] || '';
      const isError = newChar !== currentWord[userInput.length];
      stats.recordKey(newChar, duration, isError);
    }
    lastChangeTime.current = now;
  
    if (value.endsWith(' ') && !userInput.endsWith(' ')) { // Ardışık boşlukları engelle
      const typedWord = value.trim();
      if (!typedWord) return; // Prevent holding space bar to falsify WPM data
      const currentLine = lines[0];
      const currentWord = currentLine[currentWordIndex];

      if (currentWordIndex < currentLine.length) {
        stats.recordWord(typedWord, currentWord);
        setTypedWordsInLine(prev => [...prev, typedWord]);
        
        const newWordIndex = currentWordIndex + 1;
        
        if (newWordIndex >= currentLine.length) {
          // Satır tamamlandı
          setLines(prev => {
            const newLines = prev.slice(1);
            const newLine = generateNewLine(language);
            newLines.push(newLine);
            setCurrentLineTotalChars(newLine.join('').length); // Yeni satırın toplam harf sayısını güncelle
            return newLines;
          });
          setCurrentWordIndex(0);
          setTypedWordsInLine([]);
        } else {
          setCurrentWordIndex(newWordIndex);
        }
        
        setUserInput('');
      }
    } else if (!value.endsWith(' ')) { // Sadece boşluk olmayan karakterler için userInput'i güncelle
      setUserInput(value);
    }
  };

  return {
    state: {
      language,
      lines,
      currentWordIndex,
      userInput,
      isActive,
      isCompleted,
      timeLeft,
      typedWordsInLine,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      currentLineTotalChars,
    },
    actions: {
      startTest,
      restartTest,
      changeLanguage,
      renewText,
      handleInputChange,
    },
    refs: {
      inputRef,
    },
  };
};
