import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { generateRandomText, type Language } from '@/lib/languages';
import { useTypingStats } from './useTypingStats';
import { DetailedStats } from '@/lib/types';
import { textSources, type TextSource } from '@/lib/textSources';

export const useTypingGame = (onTestComplete: (stats: DetailedStats) => void) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('typingLanguage');
    const browserLanguage = navigator.language.split('-')[0]; // 'tr-TR' -> 'tr'
    if (browserLanguage === 'tr') {
      return 'tr';
    }
    return (saved as Language) || 'en';
  });

  const [source, setSource] = useState<TextSource>(() => {
    const saved = localStorage.getItem('textSource');
    return (saved as TextSource) || 'randomWords';
  });

  const [duration, setDuration] = useState<number>(() => {
    const saved = localStorage.getItem('typingDuration');
    return saved ? parseInt(saved, 10) : 60;
  });

  const [lines, setLines] = useState<string[][]>([[], [], []]);
  const [allTextLines, setAllTextLines] = useState<string[][]>([]); // Tüm metin satırlarını tutacak
  const [currentLineIndexInAllText, setCurrentLineIndexInAllText] = useState(0); // allTextLines içinde hangi satırda olduğumuzu takip edecek
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [typedWordsInLine, setTypedWordsInLine] = useState<string[]>([]);
  const [hasTestCompletedBeenCalled, setHasTestCompletedBeenCalled] = useState(false);
  const [currentLineTotalChars, setCurrentLineTotalChars] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const lastChangeTime = useRef<number | null>(null);

  const stats = useTypingStats(duration);

  const loadAndProcessText = useCallback(async (src: TextSource, lang: Language) => {
    let rawText: string;
    if (src === 'randomWords') {
      // randomWords için başlangıçta daha fazla satır üret
      const numInitialLines = 10; // Başlangıçta 10 satır üret
      const generatedLines = Array.from({ length: numInitialLines }, () => generateRandomText(48, lang));
      rawText = generatedLines.join('\n');
    } else if (textSources(lang)[src]) {
      rawText = await textSources(lang)[src]();
    } else {
      rawText = generateRandomText(48, lang); // Fallback
    }
    // Metni satırlara böl ve her satırı kelimelere ayır
    setAllTextLines(rawText.split('\n').map(line => line.trim())
                                  .filter(line => line.length > 0)
                                  .map(line => line.split(/\s+/).filter(word => word.length > 0)));
    setCurrentLineIndexInAllText(0);
  }, []);

  useEffect(() => {
    localStorage.setItem('typingLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('textSource', source);
  }, [source]);

  useEffect(() => {
    localStorage.setItem('typingDuration', String(duration));
  }, [duration]);

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

  useEffect(() => {
    if (isActive) {
      stats.calculateMetrics(startTime);
    }
  }, [isActive, startTime, stats]);

  useEffect(() => {
    if (isCompleted && !hasTestCompletedBeenCalled) {
      const { wpm, accuracy } = stats.calculateMetrics(startTime);
      if (wpm > 0) {
        const detailed = stats.generateDetailedStats(startTime, wpm, accuracy);
        onTestComplete(detailed);
        setHasTestCompletedBeenCalled(true);
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

  const loadNextLines = useCallback(() => {
    const newLines: string[][] = [];
    const startIndex = currentLineIndexInAllText;
    for (let i = 0; i < 3; i++) {
      if (startIndex + i < allTextLines.length) {
        newLines.push(allTextLines[startIndex + i]);
      } else {
        // Metin bittiğinde veya yeterli satır olmadığında boş bir dizi ekle
        newLines.push([]);
      }
    }
    setLines(newLines);
    if (newLines[0]) {
      setCurrentLineTotalChars(newLines[0].join('').length);
    }
  }, [currentLineIndexInAllText, allTextLines]);

  const restartTest = useCallback(async () => {
    setIsActive(false);
    setIsCompleted(false);
    setTimeLeft(duration);
    setStartTime(null);
    setHasTestCompletedBeenCalled(false);
    stats.resetStats();
    await loadAndProcessText(source, language); // Tüm metni yükle ve işle
    setCurrentLineIndexInAllText(0); // İlk satıra dön
    setCurrentWordIndex(0);
    setTypedWordsInLine([]);
    setUserInput('');
    inputRef.current?.focus();
  }, [loadAndProcessText, stats, duration, source, language]);

  useEffect(() => {
    restartTest();
  }, [language, source, duration]);

  useEffect(() => {
    loadNextLines(); // allTextLines veya currentLineIndexInAllText değiştiğinde satırları yükle
  }, [allTextLines, currentLineIndexInAllText, loadNextLines]);

  const changeLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'tr' : 'en';
    setLanguage(newLanguage);
  };

  const changeSource = (newSource: TextSource) => {
    setSource(newSource);
  };

  const changeDuration = (newDuration: number) => {
    setDuration(newDuration);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isActive) {
      startTest();
    }
    if (isCompleted) return;
  
    const value = e.target.value;
    const now = Date.now();
  
    if (lastChangeTime.current !== null && value.length > userInput.length) {
      const newChar = value.slice(-1);
      if (newChar !== ' ') {
        const duration = now - lastChangeTime.current;
        const currentWord = lines[0]?.[currentWordIndex] || '';
        const isError = newChar !== currentWord[userInput.length];
        stats.recordKey(newChar, duration, isError);
      }
    }
    lastChangeTime.current = now;
  
    if (value.endsWith(' ') && !userInput.endsWith(' ')) {
      const typedWord = value.trim();
      if (!typedWord) return;
      const currentLine = lines[0];
      const currentWord = currentLine[currentWordIndex];

      if (currentWordIndex < currentLine.length) {
        stats.recordWord(typedWord, currentWord);
        setTypedWordsInLine(prev => [...prev, typedWord]);
        
        const newWordIndex = currentWordIndex + 1;
        
        if (newWordIndex >= currentLine.length) {
          // Mevcut satır bitti, bir sonraki satıra geç
          setCurrentLineIndexInAllText(prevIndex => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < allTextLines.length) {
              return nextIndex;
            } else {
              // Tüm metin bittiğinde, yeni satırlar ekle
              if (source === 'randomWords') {
                const newGeneratedLines = Array.from({ length: 5 }, () => generateRandomText(48, language)); // 5 yeni satır üret
                const newProcessedLines = newGeneratedLines.map(line => line.trim())
                                                          .filter(line => line.length > 0)
                                                          .map(line => line.split(/\s+/).filter(word => word.length > 0));
                setAllTextLines(prevAllTextLines => [...prevAllTextLines, ...newProcessedLines]);
                return nextIndex; // Yeni eklenen satırların başlangıcına geç
              } else {
                // randomWords dışındaki kaynaklar için test biter
                setIsActive(false);
                setIsCompleted(true);
                return prevIndex; // Son satırda kal
              }
            }
          });
          setCurrentWordIndex(0);
          setTypedWordsInLine([]);
        } else {
          setCurrentWordIndex(newWordIndex);
        }
        
        setUserInput('');
      }
    } else if (!value.endsWith(' ')) {
      setUserInput(value);
    }
  };

  return {
    state: {
      language,
      source,
      duration,
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
      renewText: restartTest, // renewText yerine restartTest kullanıldı
      handleInputChange,
      changeSource,
      changeDuration,
    },
    refs: {
      inputRef,
    },
  };
};
