import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Keyboard, 
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Download,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react';
import { translations, keyboardLayouts, type Language } from '@/lib/languages';

interface DetailedStats {
  wpm: number;
  accuracy: number;
  duration: number;
  totalChars: number;
  correctChars: number;
  totalWords: number;
  correctWords: number;
  errorsByChar: Record<string, number>;
  errorsByWord: Record<string, number>;
  keyDetails: Array<{key: string; time: number; error: boolean}>;
  avgTimePerChar: number;
}

interface StatsModalProps {
  open: boolean;
  stats: DetailedStats | null;
  language: Language;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ open, stats, language, onClose }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'overview' | 'errors' | 'heatmap'>('overview');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [exportCountdown, setExportCountdown] = useState(3);

  useEffect(() => {
    if (open) {
      setExportCountdown(3);
      const timer = setInterval(() => {
        setExportCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [open]);

  // Calculate performance grade
  const getPerformanceGrade = useMemo(() => {
    if (!stats) return { grade: 'N/A', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800', border: 'border-slate-200 dark:border-slate-700' };
    
    const score = (stats.wpm * 0.6) + (stats.accuracy * 0.4);
    if (score >= 90) return { grade: 'A+', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50', border: 'border-emerald-200 dark:border-emerald-800' };
    if (score >= 80) return { grade: 'A', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/50', border: 'border-blue-200 dark:border-blue-800' };
    if (score >= 60) return { grade: 'C', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50', border: 'border-amber-200 dark:border-amber-800' };
    return { grade: 'D', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/50', border: 'border-red-200 dark:border-red-800' };
  }, [stats]);

  if (!stats) return null;

  // Top 5 errors by char
  const charErrors = Object.entries(stats.errorsByChar)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Top 5 errors by word
  const wordErrors = Object.entries(stats.errorsByWord)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Keyboard layout for heatmap
  const keyboardRows = keyboardLayouts[language] || keyboardLayouts.en;

  const getKeyColor = (key: string) => {
    const errors = stats.errorsByChar[key] || 0;
    const avgTime = stats.avgTimePerChar;
    const keyData = stats.keyDetails.filter(k => k.key === key);
    const avgKeyTime = keyData.length > 0 ? keyData.reduce((sum, k) => sum + k.time, 0) / keyData.length : 0;

    if (errors > 0) return 'bg-red-500/80 hover:bg-red-500 dark:bg-red-600/80 dark:hover:bg-red-600 border-red-400 dark:border-red-500';
    if (avgKeyTime > avgTime * 1.5) return 'bg-amber-500/80 hover:bg-amber-500 dark:bg-amber-600/80 dark:hover:bg-amber-600 border-amber-400 dark:border-amber-500';
    if (keyData.length > 0) return 'bg-emerald-500/80 hover:bg-emerald-500 dark:bg-emerald-600/80 dark:hover:bg-emerald-600 border-emerald-400 dark:border-emerald-500';
    return 'bg-slate-300/80 hover:bg-slate-400 dark:bg-slate-600/80 dark:hover:bg-slate-500 border-slate-300 dark:border-slate-500';
  };

  const formatTime = (ms: number) => `${(ms / 1000).toFixed(2)}s`;

  const exportStats = () => {
    const data = {
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      duration: stats.duration,
      grade: getPerformanceGrade.grade,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typing-stats-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareStats = async () => {
    const text = `I just completed a typing test!\n🎯 WPM: ${stats.wpm}\n📊 Accuracy: ${stats.accuracy}%\n⏱️ Time: ${stats.duration}s\n🏆 Grade: ${getPerformanceGrade.grade}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(text);
      }
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const TabButton = ({ tab, label, icon: Icon }: {
    tab: typeof activeTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
        activeTab === tab
          ? 'bg-accent text-background shadow-lg'
          : 'bg-secondary hover:bg-secondary-hover text-foreground hover:text-foreground border border-card-border'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={() => {
      console.log('StatsModal: onOpenChange called, triggering onClose');
      onClose();
    }}>
      <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col bg-gradient-card border-card-border [&>button]:hidden">
        <DialogHeader className="border-b border-card-border pb-6 flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${getPerformanceGrade.bg} ${getPerformanceGrade.border} border-2`}>
                <Trophy className={`h-7 w-7 ${getPerformanceGrade.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t.testComplete}</h2>
                <p className="text-sm text-foreground-muted font-medium">Performance Analysis & Insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportStats} 
                className="border-secondary hover:bg-secondary-hover text-foreground hover:text-foreground"
                disabled={exportCountdown > 0}
              >
                <Download className="h-4 w-4 mr-2" />
                {exportCountdown > 0 ? `${t.export} (${exportCountdown}s)` : t.export}
              </Button>
              <Button variant="outline" size="sm" onClick={shareStats} className="border-secondary hover:bg-secondary-hover text-foreground hover:text-foreground">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 p-2 bg-secondary rounded-2xl flex-shrink-0">
          <TabButton tab="overview" label="Overview" icon={BarChart3} />
          <TabButton tab="errors" label="Error Analysis" icon={XCircle} />
          <TabButton tab="heatmap" label="Keyboard Heatmap" icon={Keyboard} />
        </div>

        <div className="overflow-y-auto flex-1 p-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
          {activeTab === 'overview' && (
            <div className="space-y-8 p-2">
              {/* Performance Grade */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-4 px-8 py-6 rounded-3xl bg-gradient-card border-card-border border-2 shadow-xl`}>
                  <Trophy className={`h-12 w-12 ${getPerformanceGrade.color}`} />
                  <div>
                    <div className={`text-5xl font-black ${getPerformanceGrade.color}`}>
                      {getPerformanceGrade.grade}
                    </div>
                    <div className="text-sm font-semibold text-foreground">Performance Grade</div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/20 dark:from-blue-500/20 dark:to-blue-600/30 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-3 right-3 p-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-xl">
                    <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">{stats.wpm}</div>
                  <div className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">{t.wpm}</div>
                  <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Words per minute</div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 dark:from-emerald-500/20 dark:to-emerald-600/30 p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-3 right-3 p-2 bg-emerald-500/20 dark:bg-emerald-400/20 rounded-xl">
                    <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{stats.accuracy}%</div>
                  <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-1">{t.accuracy}</div>
                  <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Correct keystrokes</div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-purple-600/20 dark:from-purple-500/20 dark:to-purple-600/30 p-6 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-3 right-3 p-2 bg-purple-500/20 dark:bg-purple-400/20 rounded-xl">
                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-1">{stats.duration}s</div>
                  <div className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-1">{t.duration}</div>
                  <div className="text-xs text-purple-600/70 dark:text-purple-400/70">Total time</div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/20 dark:from-orange-500/20 dark:to-orange-600/30 p-6 rounded-2xl border border-orange-200/50 dark:border-orange-800/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-3 right-3 p-2 bg-orange-500/20 dark:bg-orange-400/20 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-1">{formatTime(stats.avgTimePerChar)}</div>
                  <div className="text-sm font-bold text-orange-700 dark:text-orange-300 mb-1">Avg Speed</div>
                  <div className="text-xs text-orange-600/70 dark:text-orange-400/70">Per character</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-6">
                <div className="bg-gradient-card p-6 rounded-2xl border border-card-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-foreground">Speed Progress</span>
                    <span className="text-sm font-semibold text-foreground-muted">{stats.wpm} / 100 WPM</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-4 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-1500 ease-out shadow-lg shadow-blue-500/30"
                      style={{ width: `${Math.min(100, (stats.wpm / 100) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-card p-6 rounded-2xl border border-card-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-foreground">Accuracy</span>
                    <span className="text-sm font-semibold text-foreground-muted">{stats.accuracy}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-4 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-4 rounded-full transition-all duration-1500 ease-out shadow-lg shadow-emerald-500/30"
                      style={{ width: `${stats.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="space-y-8 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Char Errors */}
                <div className="bg-gradient-card p-8 rounded-3xl border border-card-border">
                  <h4 className="text-xl font-bold flex items-center mb-6 text-red-700 dark:text-red-400">
                    <Keyboard className="mr-3 p-2 bg-secondary rounded-xl" size={32} />
                    Character Errors
                  </h4>
                  {charErrors.length > 0 ? (
                    <div className="space-y-4">
                      {charErrors.map(([char, count]) => (
                        <div key={char} className="flex justify-between items-center bg-secondary p-5 rounded-2xl border border-card-border hover:bg-secondary-hover transition-all duration-300 shadow-lg">
                          <span className="font-mono text-2xl bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-xl text-red-700 dark:text-red-300 font-bold">
                            {char === ' ' ? 'Space' : char}
                          </span>
                          <span className="text-red-600 dark:text-red-400 font-black text-lg">{count} errors</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <CheckCircle className="mx-auto h-20 w-20 mb-6 text-emerald-500" />
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Perfect!</p>
                      <p className="text-emerald-500 dark:text-emerald-500 font-semibold">No character errors detected</p>
                    </div>
                  )}
                </div>

                {/* Word Errors */}
                <div className="bg-gradient-card p-8 rounded-3xl border border-card-border">
                  <h4 className="text-xl font-bold flex items-center mb-6 text-amber-700 dark:text-amber-400">
                    <XCircle className="mr-3 p-2 bg-secondary rounded-xl" size={32} />
                    Word Errors
                  </h4>
                  {wordErrors.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-600">
                      {wordErrors.map(([word, count]) => (
                        <div key={word} className="flex justify-between items-center bg-secondary p-5 rounded-2xl border border-card-border hover:bg-secondary-hover transition-all duration-300 shadow-lg">
                          <span className="font-mono bg-amber-100 dark:bg-amber-900/50 px-4 py-2 rounded-xl text-amber-700 dark:text-amber-300 break-all font-bold">
                            {word}
                          </span>
                          <span className="text-amber-600 dark:text-amber-400 font-black text-lg">{count} errors</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <CheckCircle className="mx-auto h-20 w-20 mb-6 text-emerald-500" />
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Excellent!</p>
                      <p className="text-emerald-500 dark:text-emerald-500 font-semibold">No word errors detected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'heatmap' && (
            <div className="space-y-8 p-2">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-bold flex items-center text-foreground">
                  <Keyboard className="mr-3 p-2 bg-secondary rounded-xl" size={36} />
                  Keyboard Performance Heatmap
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className="border-secondary hover:bg-secondary-hover text-foreground hover:text-foreground"
                >
                  {showHeatmap ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showHeatmap ? 'Hide' : 'Show'} Heatmap
                </Button>
              </div>

              {showHeatmap && (
                <div className="bg-gradient-card p-10 rounded-3xl border border-card-border shadow-2xl">
                  <div className="max-w-5xl mx-auto">
                    {keyboardRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex justify-center mb-3">
                        {row.map(key => {
                          const keyData = stats.keyDetails.filter(k => k.key === key);
                          const errors = stats.errorsByChar[key] || 0;
                          
                          return (
                            <div
                              key={key}
                              className={`
                                relative m-1 px-4 py-4 text-sm border-2 rounded-2xl font-mono font-black
                                flex items-center justify-center cursor-pointer
                                transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:z-10
                                ${key === ' ' ? 'w-40' : 'w-14 h-14'}
                                ${getKeyColor(key)}
                                text-white shadow-xl
                              `}
                              title={`Key: ${key === ' ' ? 'Space' : key.toUpperCase()}\nUsed: ${keyData.length} times\nErrors: ${errors}`}
                            >
                              {key === ' ' ? 'SPACE' : key.toUpperCase()}
                              {errors > 0 && (
                                <div className="absolute -top-2 -right-2 bg-red-600 dark:bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                                  {errors}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center mt-10 gap-8 text-sm font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-red-500 rounded-lg shadow-md"></div>
                    <span className="text-foreground">Errors</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-amber-500 rounded-lg shadow-md"></div>
                      <span className="text-foreground">Slow</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-emerald-500 rounded-lg shadow-md"></div>
                      <span className="text-foreground">Good</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-slate-400 rounded-lg shadow-md"></div>
                      <span className="text-foreground">Unused</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-card-border pt-6 flex justify-between items-center flex-shrink-0">
          <div className="text-sm text-foreground-muted font-medium">
            Test completed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-secondary hover:bg-secondary-hover text-foreground hover:text-foreground"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
