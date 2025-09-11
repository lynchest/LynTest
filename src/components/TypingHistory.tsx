import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { translations, type Language } from '@/lib/languages';

interface TypingStats {
  wpm: number;
  accuracy: number;
  duration: number;
  timestamp: Date;
}

interface TypingHistoryProps {
  history: TypingStats[];
  language: Language;
}

export const TypingHistory: React.FC<TypingHistoryProps> = ({ history, language }) => {
  const t = translations[language];
  const getBestWpm = () => {
    if (history.length === 0) return 0;
    return Math.max(...history.map(stat => stat.wpm));
  };

  const getAverageWpm = () => {
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, stat) => acc + stat.wpm, 0);
    return Math.round(sum / history.length);
  };

  const getAverageAccuracy = () => {
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, stat) => acc + stat.accuracy, 0);
    return Math.round(sum / history.length);
  };

  return (
    <Card className="bg-gradient-card border-card-border shadow-lg h-fit">
      <CardHeader className="pb-3">
        <CardTitle as="h2" className="flex items-center text-foreground">
          <History className="mr-2 h-4 w-4 text-accent" />
          {t.yourProgress}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Statistics Summary */}
        {history.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-3 bg-background-accent rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-accent">{getBestWpm()}</div>
              <div className="text-xs text-foreground-muted">{t.bestWpm}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">{getAverageWpm()}</div>
              <div className="text-xs text-foreground-muted">{t.avgWpm}</div>
            </div>
          </div>
        )}

        {/* Recent Tests */}
        <div>
          <h4 className="text-sm font-medium text-foreground-muted mb-2">
            {t.recentTests}
          </h4>
          
          {history.length === 0 ? (
            <div className="text-center py-8 text-foreground-muted">
              <TrendingUp className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">{t.noTestsYet}</p>
            </div>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-2" role="list">
                {history.map((stat, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-background-secondary border border-card-border hover:bg-background-accent transition-colors duration-fast"
                    role="listitem"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-medium text-foreground">
                        {stat.wpm} WPM
                      </div>
                      <div className="text-xs text-foreground-subtle">
                        {format(stat.timestamp, 'MMM d')}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-foreground-muted">
                        {stat.accuracy}% accuracy
                      </div>
                      <div className="text-xs text-foreground-subtle">
                        {stat.duration}s
                      </div>
                    </div>
                    
                    {/* Progress indicator for recent improvement */}
                    {index > 0 && (
                      <div className="mt-1 flex items-center">
                        {stat.wpm > history[index - 1].wpm ? (
                          <TrendingUp className="h-3 w-3 text-success mr-1" />
                        ) : stat.wpm < history[index - 1].wpm ? (
                          <TrendingUp className="h-3 w-3 text-error mr-1 rotate-180" />
                        ) : (
                          <div className="h-3 w-3 mr-1" />
                        )}
                        {stat.wpm !== history[index - 1].wpm && (
                          <span className={`text-xs ${
                            stat.wpm > history[index - 1].wpm 
                              ? 'text-success' 
                              : 'text-error'
                          }`}>
                            {stat.wpm > history[index - 1].wpm ? '+' : ''}
                            {stat.wpm - history[index - 1].wpm}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
