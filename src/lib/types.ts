export interface TypingStats {
  wpm: number;
  accuracy: number;
  duration: number;
  timestamp: Date;
}

export interface DetailedStats {
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
