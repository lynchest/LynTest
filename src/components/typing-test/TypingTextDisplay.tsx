import React, { memo } from 'react';

interface TypingTextDisplayProps {
  lines: string[][];
  currentWordIndex: number;
  typedWordsInLine: string[];
  userInput: string;
}

type WordStatus = 'completed-correct' | 'completed-incorrect' | 'current' | 'pending';
type CharStatus = 'correct' | 'incorrect' | 'cursor' | 'pending';

const getWordStatus = (
  lineIndex: number,
  wordIndex: number,
  currentWordIndex: number,
  isCurrentLine: boolean
): WordStatus => {
  if (!isCurrentLine) return 'pending';
  
  if (wordIndex < currentWordIndex) {
    return 'completed-correct'; // Will be overridden based on typing accuracy
  }
  
  if (wordIndex === currentWordIndex) {
    return 'current';
  }
  
  return 'pending';
};

const getCharStatus = (charIndex: number, userInput: string, expectedChar: string): CharStatus => {
  if (charIndex < userInput.length) {
    return userInput[charIndex] === expectedChar ? 'correct' : 'incorrect';
  }
  
  if (charIndex === userInput.length) {
    return 'cursor';
  }
  
  return 'pending';
};

// Memoized word component for better performance
const WordComponent = memo<{
  word: string;
  status: WordStatus;
  isCorrect?: boolean;
  userInput?: string;
  lineIndex: number;
}>(({ word, status, isCorrect, userInput = '', lineIndex }) => {
  const baseClasses = "mr-2 mb-1 char-transition";
  
  switch (status) {
    case 'completed-correct':
      return (
        <span className={baseClasses}>
          <span className={`${isCorrect ? 'text-foreground-muted' : 'text-error underline decoration-error decoration-2 underline-offset-2'} px-1 rounded transition-all duration-200`}>
            {word}
          </span>
        </span>
      );
      
    case 'current':
      return (
        <span className={baseClasses}>
          <span className="px-1 rounded underline decoration-accent decoration-2 underline-offset-4 transition-all duration-200">
            {word.split('').map((char, charIndex) => {
              const charStatus = getCharStatus(charIndex, userInput, char);
              
              let charClassName = 'char-transition transition-all duration-100';
              if (charStatus === 'correct') {
                charClassName += ' text-foreground';
              } else if (charStatus === 'incorrect') {
                charClassName += ' text-error';
              } else if (charStatus === 'cursor') {
                charClassName += ' text-foreground border-l-2 border-accent animate-pulse';
              } else {
                charClassName += ' text-foreground-muted';
              }
              
              return (
                <span 
                  key={charIndex} 
                  className={charClassName}
                  style={{ 
                    animationDuration: charStatus === 'cursor' ? '2s' : 'inherit'
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        </span>
      );
      
    case 'pending':
    default: {
      const opacityClass = lineIndex > 0 ? 'opacity-50' : '';
      return (
        <span className={`${baseClasses} text-foreground-muted transition-all duration-200 ${opacityClass}`}>
          {word}
        </span>
      );
    }
  }
});

WordComponent.displayName = 'WordComponent';

export const TypingTextDisplay: React.FC<TypingTextDisplayProps> = memo(({
  lines,
  currentWordIndex,
  typedWordsInLine,
  userInput,
}) => {
  if (!lines?.length) {
    return (
      <div className="text-2xl leading-relaxed font-mono tracking-wide select-none min-h-[6rem] flex items-center justify-center text-foreground-muted">
        No text to display
      </div>
    );
  }

  return (
    <div className="text-2xl leading-relaxed font-mono tracking-wide select-none min-h-[6rem]">
      {lines.map((line, lineIndex) => {
        const isCurrentLine = lineIndex === 0;
        
        return (
          <div 
            key={lineIndex} 
            className="flex flex-wrap mb-2"
          >
            {line.map((word, wordIndex) => {
              const status = getWordStatus(lineIndex, wordIndex, currentWordIndex, isCurrentLine);
              const isCorrect = isCurrentLine && wordIndex < currentWordIndex 
                ? typedWordsInLine[wordIndex] === word 
                : undefined;
              
              return (
                <WordComponent
                  key={wordIndex}
                  word={word}
                  status={status}
                  isCorrect={isCorrect}
                  userInput={status === 'current' ? userInput : ''}
                  lineIndex={lineIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

TypingTextDisplay.displayName = 'TypingTextDisplay';