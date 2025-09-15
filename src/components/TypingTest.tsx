import React, { useState, lazy, Suspense, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Languages, Moon, Sun } from 'lucide-react';
import { MetricsDisplay } from './MetricsDisplay';
import { translations } from '@/lib/languages';
import { DetailedStats, TypingStats } from '@/lib/types';
import { useTheme } from 'next-themes';

// Kancaları (Hooks) içe aktar
import { useTypingGame } from '@/hooks/useTypingGame';
import { useTypingHistory } from '@/hooks/useTypingHistory';

// Bileşenleri içe aktar
import { TypingTextDisplay } from './typing-test/TypingTextDisplay';
import { TypingInputArea } from './typing-test/TypingInputArea';
import { TypingControls } from './typing-test/TypingControls';
import { TestResults } from './typing-test/TestResults';

const TypingHistory = lazy(() => import('./TypingHistory').then(module => ({ default: module.TypingHistory })));
const StatsModal = lazy(() => import('./StatsModal').then(module => ({ default: module.StatsModal })));

export const TypingTest: React.FC = () => {
  const [detailedStats, setDetailedStats] = useState<DetailedStats | null>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  
  const { history, addHistoryEntry } = useTypingHistory();
  const { setTheme } = useTheme();

  const handleTestComplete = useCallback((stats: DetailedStats) => {
    const finalStats: TypingStats = {
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      duration: stats.duration,
      timestamp: new Date(),
    };
    addHistoryEntry(finalStats);
    setDetailedStats(stats);
    setShowStatsModal(true);
  }, [addHistoryEntry]);

  const { state, actions, refs } = useTypingGame(handleTestComplete);
  const t = translations[state.language];

  return (
    <div className="min-h-screen bg-gradient-background font-sans">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Başlık */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold font-heading text-foreground">
              {t.title}
            </h1>
            <Button
              onClick={actions.changeLanguage}
              variant="outline"
              size="sm"
              className="border-secondary hover:bg-secondary-hover"
            >
              <Languages className="mr-2 h-4 w-4" />
              {state.language.toUpperCase()}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-secondary hover:bg-secondary-hover">
                  <div className="flex items-center">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
                    <span>Tema</span>
                  </div>
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="bottom" sideOffset={8} className="bg-background/80 backdrop-blur-sm">
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between">
                  <span>Light</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-white border border-gray-200"></span>
                    <span className="block w-4 h-4 rounded-full bg-gray-200 border border-gray-300"></span>
                    <span className="block w-4 h-4 rounded-full bg-gray-400 border border-gray-500"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between">
                  <span>Dark</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-gray-900 border border-gray-700"></span>
                    <span className="block w-4 h-4 rounded-full bg-gray-700 border border-gray-600"></span>
                    <span className="block w-4 h-4 rounded-full bg-gray-500 border border-gray-400"></span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-foreground-muted text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Ana yazma alanı */}
          <div className="lg:col-span-3 space-y-6">
            {/* Metrikler */}
            <MetricsDisplay 
              wpm={state.wpm} 
              accuracy={state.accuracy} 
              timeLeft={state.timeLeft}
              isActive={state.isActive}
              language={state.language}
            />

            {/* Metin görüntüleme */}
            <Card className="bg-gradient-card border-card-border shadow-lg">
              <CardContent className="p-8">
                <TypingTextDisplay
                  lines={state.lines}
                  currentWordIndex={state.currentWordIndex}
                  typedWordsInLine={state.typedWordsInLine}
                  userInput={state.userInput}
                />
              </CardContent>
            </Card>

            {/* Giriş alanı */}
            <TypingInputArea
              inputRef={refs.inputRef}
              userInput={state.userInput}
              handleInputChange={actions.handleInputChange}
              isCompleted={state.isCompleted}
              isActive={state.isActive}
              language={state.language}
            />

            {/* Kontroller */}
            <TypingControls
              onRestart={() => actions.restartTest()}
              onChangeText={() => actions.restartTest()}
              language={state.language}
            />

            {/* Sonuçlar */}
            {state.isCompleted && (
              <TestResults
                wpm={state.wpm}
                accuracy={state.accuracy}
                duration={60} // Sabit süre
                language={state.language}
              />
            )}
          </div>

          {/* Geçmiş kenar çubuğu */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="text-center p-4">Loading History...</div>}>
              <TypingHistory history={history} language={state.language} />
            </Suspense>
          </div>
        </div>
      
        <Suspense fallback={null}>
          <StatsModal 
            open={showStatsModal} 
            stats={detailedStats} 
            language={state.language} 
            onClose={() => setShowStatsModal(false)} 
          />
        </Suspense>
      </div>
    </div>
  );
};
