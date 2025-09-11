import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Timer, Gauge, Target } from 'lucide-react';
import { translations, type Language } from '@/lib/languages';

interface MetricsDisplayProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
  isActive: boolean;
  language: Language;
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  wpm,
  accuracy,
  timeLeft,
  isActive,
  language
}) => {
  const t = translations[language];
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-success';
    if (accuracy >= 90) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Timer */}
      <Card className="bg-gradient-card border-card-border">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-accent-subtle">
            <Timer className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-sm text-foreground-muted">{t.timeLeft}</div>
            <div className={`text-2xl font-bold ${isActive ? 'text-foreground' : 'text-foreground-muted'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WPM */}
      <Card className="bg-gradient-card border-card-border">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-accent-subtle">
            <Gauge className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-sm text-foreground-muted">{t.wpm}</div>
            <div className="text-2xl font-bold text-foreground">
              {wpm}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accuracy */}
      <Card className="bg-gradient-card border-card-border">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-accent-subtle">
            <Target className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-sm text-foreground-muted">{t.accuracy}</div>
            <div className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>
              {accuracy}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};