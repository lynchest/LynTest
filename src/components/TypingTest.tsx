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
  const { setTheme, theme } = useTheme();

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
                    <span>{theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : 'Tema'}</span>
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
                <DropdownMenuItem onClick={() => setTheme("forest")} className="flex items-center justify-between">
                  <span>Forest</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-green-900 border border-green-700"></span>
                    <span className="block w-4 h-4 rounded-full bg-green-700 border border-green-600"></span>
                    <span className="block w-4 h-4 rounded-full bg-green-500 border border-green-400"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("rose")} className="flex items-center justify-between">
                  <span>Rose</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-rose-900 border border-rose-700"></span>
                    <span className="block w-4 h-4 rounded-full bg-rose-700 border border-rose-600"></span>
                    <span className="block w-4 h-4 rounded-full bg-rose-500 border border-rose-400"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("sunrise")} className="flex items-center justify-between">
                  <span>Sunrise</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#FFB347] border border-[#FF6961]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#FF6961] border border-[#FFF5E1]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#FFF5E1] border border-[#FFB347]"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("matrix")} className="flex items-center justify-between">
                  <span>Matrix</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#000000] border border-[#00FF41]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#00FF41] border border-[#0A0A0A]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#0A0A0A] border border-[#000000]"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("pastel-spring")} className="flex items-center justify-between">
                  <span>Pastel Spring</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#FFD1DC] border border-[#B5EAD7]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#B5EAD7] border border-[#FFFDF7]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#FFFDF7] border border-[#FFD1DC]"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("deep-ocean")} className="flex items-center justify-between">
                  <span>Deep Ocean</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#003366] border border-[#00CED1]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#00CED1] border border-[#001F33]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#001F33] border border-[#003366]"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("retro-80s")} className="flex items-center justify-between">
                  <span>Retro 80s</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#FF00FF] border border-[#00FFFF]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#00FFFF] border border-[#1A1A40]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#1A1A40] border border-[#FF00FF]"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("coffee-break")} className="flex items-center justify-between">
                  <span>Coffee Break</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#4B3832] border border-[#D9B382]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#D9B382] border border-[#FFF8F0]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#FFF8F0] border border-[#4B3832]"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("space-exploration")} className="flex items-center justify-between">
                  <span>Space Exploration</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#0c0e19] border border-[#00e5e5]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#171b2a] border border-[#9b59ff]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#00e5e5] border border-[#0c0e19]"></span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("minimal-white")} className="flex items-center justify-between">
                  <span>Minimal White</span>
                  <div className="flex gap-1">
                    <span className="block w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#2E2E2E]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#2E2E2E] border border-[#F5F5F5]"></span>
                    <span className="block w-4 h-4 rounded-full bg-[#F5F5F5] border border-[#FFFFFF]"></span>
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
