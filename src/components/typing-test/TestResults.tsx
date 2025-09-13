import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { translations, type Language } from '@/lib/languages';

interface TestResultsProps {
  wpm: number;
  accuracy: number;
  duration: number;
  language: Language;
}

export const TestResults: React.FC<TestResultsProps> = ({ wpm, accuracy, duration, language }) => {
  const t = translations[language];

  return (
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
            <div className="text-3xl font-bold text-accent">{duration}s</div>
            <div className="text-foreground-muted">{t.duration}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
