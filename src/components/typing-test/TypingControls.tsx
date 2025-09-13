import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Shuffle } from 'lucide-react';
import { translations, type Language } from '@/lib/languages';

interface TypingControlsProps {
  onRestart: () => void;
  onChangeText: () => void;
  language: Language;
}

export const TypingControls: React.FC<TypingControlsProps> = ({
  onRestart,
  onChangeText,
  language,
}) => {
  const t = translations[language];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button
        onClick={onRestart}
        variant="outline"
        size="lg"
        className="border-secondary hover:bg-secondary-hover"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        {t.restart}
      </Button>
      
      <Button
        onClick={onChangeText}
        variant="outline"
        size="lg"
        className="border-secondary hover:bg-secondary-hover"
      >
        <Shuffle className="mr-2 h-4 w-4" />
        {t.newText}
      </Button>
    </div>
  );
};
