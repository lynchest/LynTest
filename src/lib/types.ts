export interface TypingStats {
  wpm: number;
  accuracy: number;
  duration: number;
  timestamp: Date;
}

export type Finger = 
  | 'leftPinky' | 'leftRing' | 'leftMiddle' | 'leftIndex' | 'leftThumb'
  | 'rightThumb' | 'rightIndex' | 'rightMiddle' | 'rightRing' | 'rightPinky';

export interface FingerStats {
  errors: number;
  totalChars: number;
  speed: number; // Chars per second for that finger
}

export interface DifficultyAnalysis {
  averageWordLength: number;
  punctuationCount: number;
  numberCount: number;
  performanceByWordLength: Record<number, { wpm: number; accuracy: number; count: number }>;
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
  timestamp: Date;

  // Feature: Error Type Analysis
  backspaceCount: number;
  extraChars: number;
  missedChars: number;

  // Feature: Finger-based Performance
  fingerStats: Record<Finger, FingerStats>;

  // Feature: Text Difficulty Analysis
  difficultyAnalysis: DifficultyAnalysis;
}
