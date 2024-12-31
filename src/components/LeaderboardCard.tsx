import React from 'react';
import { Trophy, Medal, Brain } from 'lucide-react';
import { StudentResult } from '../types';
import { getRankColor, getSkippedQuestions, hasCompletedAllQuestions } from '../utils/rankUtils';
import { formatAccuracy } from '../utils/formatUtils';

interface LeaderboardCardProps {
  student: StudentResult & { rank: number };
  rank: number;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2: return <Medal className="h-6 w-6 text-gray-500" />;
    case 3: return <Medal className="h-6 w-6 text-orange-500" />;
    default: return <span className="text-lg font-bold text-gray-500">{rank}</span>;
  }
};

export function LeaderboardCard({ student, rank }: LeaderboardCardProps) {
  if (!student?.testResults?.categoryScores || !student.userDetails) {
    return null;
  }

  const { testResults, userDetails } = student;
  const skippedQuestions = getSkippedQuestions(student);
  const completedAll = hasCompletedAllQuestions(student);

  return (
    <div 
      className={`${completedAll ? getRankColor(rank) : 'bg-gray-50'} border rounded-xl p-4 flex items-center gap-4 
        transition-all duration-300 hover:shadow-md hover:scale-[1.01] cursor-pointer`}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
        {completedAll ? getRankIcon(rank) : "—"}
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          {!completedAll ? (
            <span className="text-sm font-medium text-red-500">
              Incomplete: Skipped {skippedQuestions} questions
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-500">#{rank}</span>
          )}
          <h3 className="font-semibold text-gray-900">{userDetails.name}</h3>
        </div>
        <p className="text-sm text-gray-600">
          {userDetails.branch.toUpperCase()} - Year {userDetails.yearOfStudy}
        </p>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="text-center">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Brain className="h-4 w-4" />
            <span>Accuracy</span>
          </div>
          <p className="font-bold text-blue-600">{formatAccuracy(testResults.accuracy)}%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Trophy className="h-4 w-4" />
            <span>Score</span>
          </div>
          <p className="font-bold text-green-600">
            {testResults.correctAnswers}/{testResults.totalQuestions}
          </p>
        </div>
      </div>
    </div>
  );
}