import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { translations, type Language } from '@/lib/languages';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTextSourceOptions, type TextSource } from '@/lib/textSources';

const durationOptions = [
  { value: 15, label: '15s' },
  { value: 30, label: '30s' },
  { value: 60, label: '60s' },
  { value: 120, label: '120s' },
];

interface TypingControlsProps {
  onRestart: () => void;
  language: Language;
  source: TextSource;
  onSourceChange: (source: TextSource) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
}

export const TypingControls: React.FC<TypingControlsProps> = ({
  onRestart,
  language,
  source,
  onSourceChange,
  duration,
  onDurationChange,
}) => {
  const t = translations[language];
  const textSourceOptions = getTextSourceOptions(language);

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

      <Select onValueChange={(value) => onSourceChange(value as TextSource)} value={source}>
        <SelectTrigger className="w-[180px] border-secondary hover:bg-secondary-hover">
          <SelectValue placeholder={t.randomWords} />
        </SelectTrigger>
        <SelectContent className="bg-background/80 backdrop-blur-sm">
          {textSourceOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onDurationChange(Number(value))} value={String(duration)}>
        <SelectTrigger className="w-[180px] border-secondary hover:bg-secondary-hover">
          <SelectValue placeholder="Süre" />
        </SelectTrigger>
        <SelectContent className="bg-background/80 backdrop-blur-sm">
          {durationOptions.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
