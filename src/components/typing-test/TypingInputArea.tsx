import React, { RefObject } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { translations, type Language } from '@/lib/languages';

interface TypingInputAreaProps {
  inputRef: RefObject<HTMLInputElement>;
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCompleted: boolean;
  isActive: boolean;
  language: Language;
}

export const TypingInputArea: React.FC<TypingInputAreaProps> = ({
  inputRef,
  userInput,
  handleInputChange,
  isCompleted,
  isActive,
  language,
}) => {
  const t = translations[language];

  return (
    <Card className="bg-gradient-card border-card-border shadow-lg">
      <CardContent className="p-6">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isCompleted}
          placeholder={isActive ? t.typeTextAbove : t.clickStartToBegin}
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
  );
};
