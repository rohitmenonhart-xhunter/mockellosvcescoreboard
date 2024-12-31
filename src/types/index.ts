export interface CategoryScore {
  accuracy: number;
  correct: number;
  total: number;
}

export interface TestResults {
  accuracy: number;
  categoryScores: {
    CODING: CategoryScore;
    VERBAL: CategoryScore;
    LOGICAL: CategoryScore;
    QUANTITATIVE: CategoryScore;
  };
  correctAnswers: number;
  totalQuestions: number;
  totalTime: number;
}

export interface UserDetails {
  branch: string;
  college: string;
  email: string;
  name: string;
  registerNumber: string;
  yearOfStudy: string;
}

export interface StudentResult {
  testResults: TestResults;
  timestamp: string;
  userDetails: UserDetails;
}