export type Role = 'student' | 'examiner' | 'admin';

export type PageId =
  | 'landing'
  | 'login'
  | 'register'
  | 'profile'
  | 'settings'
  // Student pages
  | 'student-dashboard'
  | 'exam-list'
  | 'exam-instructions'
  | 'online-exam'
  | 'results'
  | 'analytics'
  | 'ai-assistant'
  // Examiner pages
  | 'examiner-dashboard'
  | 'create-exam'
  | 'question-bank'
  | 'live-proctor'
  // Admin pages
  | 'admin-dashboard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  institution?: string;
  phone?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'multiselect' | 'subjective';
  options?: string[];
  correctAnswer?: string | string[];
  userAnswer?: string | string[];
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  duration: number; // in minutes
  questionsCount: number;
  startTime: string;
  endTime: string;
  marks: number;
  questions?: Question[];
  negativeMarking?: boolean;
  randomize?: boolean;
}

export interface ExamAttemptResult {
  examId: string;
  examName: string;
  subject: string;
  score: number;
  maxScore: number;
  percentage: number;
  rank: number;
  totalCandidates: number;
  timeTaken: string; // e.g. "42 mins 15 secs"
  accuracy: number; // percentage
  aiFeedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  subjectAnalysis: {
    subject: string;
    score: number;
    average: number;
  }[];
}

export interface ProctorAlert {
  id: string;
  timestamp: string;
  type: 'face_missing' | 'multiple_faces' | 'tab_switch' | 'mobile_detected' | 'voice_detected';
  message: string;
  severity: 'low' | 'medium' | 'critical';
  resolved?: boolean;
}

export interface StudentLiveStatus {
  id: string;
  name: string;
  riskScore: number;
  currentQuestion: string;
  status: 'online' | 'offline' | 'away';
  alertsCount: number;
  latestViolation?: string;
  avatarColor: string;
}
