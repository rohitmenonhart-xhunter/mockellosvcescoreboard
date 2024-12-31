import type { StudentResult } from '../types';

const TOTAL_REQUIRED_QUESTIONS = 65;

export const getRankColor = (rank: number): string => {
  switch (rank) {
    case 1: return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
    case 2: return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    case 3: return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
    default: return 'bg-white hover:bg-gray-50 border-gray-100';
  }
};

export const hasCompletedAllQuestions = (result: StudentResult): boolean => {
  const { testResults } = result;
  const totalAttempted = testResults.correctAnswers + 
    (testResults.totalQuestions - testResults.correctAnswers);
  return totalAttempted === TOTAL_REQUIRED_QUESTIONS;
};

export const getSkippedQuestions = (result: StudentResult): number => {
  const { testResults } = result;
  const totalAttempted = testResults.correctAnswers + 
    (testResults.totalQuestions - testResults.correctAnswers);
  return TOTAL_REQUIRED_QUESTIONS - totalAttempted;
};

interface RankedResult extends StudentResult {
  rank: number;
}

export const sortAndRankResults = (results: StudentResult[]): RankedResult[] => {
  // Filter and separate complete and incomplete results
  const completedResults = results.filter(hasCompletedAllQuestions);
  const incompleteResults = results.filter(r => !hasCompletedAllQuestions(r));
  
  // Sort completed results by accuracy
  const sortedCompleted = [...completedResults].sort((a, b) => {
    return b.testResults.accuracy - a.testResults.accuracy;
  });

  // Assign ranks with ties
  let currentRank = 1;
  let currentAccuracy = -1;
  let tieCount = 0;

  const rankedCompleted = sortedCompleted.map((result, index) => {
    if (result.testResults.accuracy !== currentAccuracy) {
      currentRank = currentRank + tieCount;
      currentAccuracy = result.testResults.accuracy;
      tieCount = 0;
    }
    tieCount++;
    
    return {
      ...result,
      rank: currentRank
    };
  });

  // Add incomplete results with no rank
  const rankedIncomplete = incompleteResults
    .sort((a, b) => {
      const aAttempted = a.testResults.totalQuestions;
      const bAttempted = b.testResults.totalQuestions;
      return bAttempted - aAttempted;
    })
    .map(result => ({
      ...result,
      rank: -1 // Use -1 to indicate no rank
    }));

  return [...rankedCompleted, ...rankedIncomplete];
};