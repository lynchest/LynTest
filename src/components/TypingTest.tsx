import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, RotateCcw, Shuffle, Languages } from 'lucide-react';
import { MetricsDisplay } from './MetricsDisplay';
import { TypingHistory } from './TypingHistory';
import { cn } from '@/lib/utils';
import { generateRandomText, translations, type Language } from '@/lib/languages';

interface TypingStats {
  wpm: number;
  accuracy: number;
  duration: number;
  timestamp: Date;
}

export const TypingTest: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('typingLanguage');
    return (saved as Language) || 'en';
  });
  const [currentText, setCurrentText] = useState(() => generateRandomText(15, language));
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testDuration] = useState(60);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [history, setHistory] = useState<TypingStats[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [sessionTotalWords, setSessionTotalWords] = useState(0);
  const [sessionCorrectWords, setSessionCorrectWords] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  // Save language preference
  useEffect(() => {
    localStorage.setItem('typingLanguage', language);
  }, [language]);

  // Load history from localStorage on component mount
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
    if (history.length > 0) {
      localStorage.setItem('typingHistory', JSON.stringify(history));
    }
  }, [history]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
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

  // Calculate metrics
  const calculateMetrics = useCallback(() => {
    if (!startTime || sessionTotalWords === 0) return;

    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const wordsTyped = sessionTotalWords;
    const currentWpm = Math.round(wordsTyped / Math.max(timeElapsed, 0.01));

    const currentAccuracy = sessionTotalWords > 0 
      ? Math.round((sessionCorrectWords / sessionTotalWords) * 100) 
      : 100;

    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  }, [sessionTotalWords, sessionCorrectWords, startTime]);

  useEffect(() => {
    calculateMetrics();
  }, [calculateMetrics, sessionTotalWords]);

  // Handle test completion
  useEffect(() => {
    if (isCompleted) {
      const finalStats: TypingStats = {
        wpm,
        accuracy,
        duration: testDuration,
        timestamp: new Date()
      };
      setHistory(prev => [finalStats, ...prev.slice(0, 9)]); // Keep last 10 results
    }
  }, [isCompleted, wpm, accuracy, testDuration]);

  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
    setIsCompleted(false);
    inputRef.current?.focus();
  };

  const renewText = (lang: Language = language) => {
    const newText = generateRandomText(15, lang);
    setCurrentText(newText);
    setCurrentWordIndex(0);
    setTypedWords([]);
    setUserInput('');
  };

  const fetchNewText = () => {
    const newText = generateRandomText(15, language);
    setCurrentText(newText);
    setCurrentWordIndex(0);
    setTypedWords([]); // Reset for the new text block
    setUserInput('');
  };

  const restartTest = (lang: Language = language) => {
    setIsActive(false);
    setTimeLeft(testDuration);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setStartTime(null);
    setSessionTotalWords(0);
    setSessionCorrectWords(0);
    renewText(lang);
    inputRef.current?.focus();
  };

  const changeText = () => {
    renewText();
  };

  const changeLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'tr' : 'en';
    setLanguage(newLanguage);
    restartTest(newLanguage);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;
    
    const value = e.target.value;
    
    // Boşluk tuşuna basıldığında kelimeyi tamamla
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const textWords = currentText.split(' ');
      
      if (currentWordIndex < textWords.length) {
        setTypedWords(prev => [...prev, typedWord]);
        setSessionTotalWords(prev => prev + 1);
        if (typedWord === textWords[currentWordIndex]) {
          setSessionCorrectWords(prev => prev + 1);
        }
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        
        // Tüm kelimeler tamamlandıysa yeni metin getir
        if (currentWordIndex + 1 >= textWords.length) {
          fetchNewText();
        }
      }
    } else {
      setUserInput(value);
    }
  };

  const renderText = () => {
    const words = currentText.split(' ');
    
    return words.map((word, wordIndex) => {
      let wordClassName = 'mr-2 char-transition';
      
      if (wordIndex < currentWordIndex) {
        // Tamamlanan kelimeler
        const typedWord = typedWords[wordIndex];
        if (typedWord === word) {
          wordClassName += 'text-success bg-success-subtle px-1 rounded';
        } else {
          wordClassName += 'text-error bg-error-subtle px-1 rounded';
        }
      } else if (wordIndex === currentWordIndex) {
        // Şu anda yazılan kelime
        wordClassName += 'bg-accent-subtle px-1 rounded border-l-2 border-accent';
        
        // Karakter karakter kontrolü için şu anki kelime
        return (
          <span key={wordIndex} className={wordClassName}>
            {word.split('').map((char, charIndex) => {
              let charClassName = 'char-transition';
              if (charIndex < userInput.length) {
                if (userInput[charIndex] === char) {
                  charClassName += ' text-success';
                } else {
                  charClassName += ' text-error bg-error-subtle';
                }
              } else {
                charClassName += ' text-foreground-muted';
              }
              return (
                <span key={charIndex} className={charClassName}>
                  {char}
                </span>
              );
            })}
            <span className="text-foreground-muted"> </span>
          </span>
        );
      } else {
        // Henüz yazılmayan kelimeler
        wordClassName += 'text-foreground-muted';
      }
      
      return (
        <span key={wordIndex} className={wordClassName}>
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background font-sans">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold font-heading text-foreground">
              {t.title}
            </h1>
            <Button
              onClick={changeLanguage}
              variant="outline"
              size="sm"
              className="border-secondary hover:bg-secondary-hover"
            >
              <Languages className="mr-2 h-4 w-4" />
              {language.toUpperCase()}
            </Button>
          </div>
          <p className="text-foreground-muted text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main typing area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Metrics */}
            <MetricsDisplay 
              wpm={wpm} 
              accuracy={accuracy} 
              timeLeft={timeLeft}
              isActive={isActive}
              language={language}
            />

            {/* Text display */}
            <Card className="bg-gradient-card border-card-border shadow-lg">
              <CardContent className="p-8">
                <div className="text-2xl leading-relaxed font-mono tracking-wide select-none">
                  {renderText()}
                </div>
              </CardContent>
            </Card>

            {/* Input field */}
            <Card className="bg-gradient-card border-card-border shadow-lg">
              <CardContent className="p-6">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  disabled={!isActive && !isCompleted}
                  placeholder={!isActive ? t.clickStartToBegin : t.typeTextAbove}
                  className={cn(
                    "w-full p-4 text-xl bg-input border border-input-border rounded-lg",
                    "text-foreground placeholder:text-foreground-subtle",
                    "focus:ring-2 focus:ring-accent focus:border-transparent",
                    "transition-all duration-normal",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                />
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              {!isActive && !isCompleted && (
                <Button 
                  onClick={startTest}
                  size="lg"
                  className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-md"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t.startTest}
                </Button>
              )}
              
              <Button 
                onClick={() => restartTest()}
                variant="outline"
                size="lg"
                className="border-secondary hover:bg-secondary-hover"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {t.restart}
              </Button>
              
              <Button 
                onClick={changeText}
                variant="outline"
                size="lg"
                className="border-secondary hover:bg-secondary-hover"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                {t.newText}
              </Button>
            </div>

            {/* Results */}
            {isCompleted && (
              <Card className="bg-gradient-card border-accent shadow-glow">
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {t.testComplete}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-accent">{wpm}</div>
                      <div className="text-foreground-muted">{t.wpm}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent">{accuracy}%</div>
                      <div className="text-foreground-muted">{t.accuracy}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent">{testDuration}s</div>
                      <div className="text-foreground-muted">{t.duration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* History sidebar */}
          <div className="lg:col-span-1">
            <TypingHistory history={history} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};
