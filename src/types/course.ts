export interface Course {
  id: string;
  title: string;
  description: string;
  source: 'youtube' | 'pdf';
  sourceUrl?: string;
  fileName?: string;
  createdAt: Date;
  duration: string;
  topics: string[];
  progress: number;
  notes: CourseNote[];
  quizzes: Quiz[];
  flashcards: Flashcard[];
  summary: string;
}

export interface CourseNote {
  id: string;
  title: string;
  content: string;
  timestamp?: string;
  topics: string[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  completedAt?: Date;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'coding';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  reviewCount: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  courseContext?: string;
}