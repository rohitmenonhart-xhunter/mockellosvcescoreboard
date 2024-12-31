import React from 'react';
import { Trophy, BookOpen, Code, MessageSquare, Calculator, Lightbulb } from 'lucide-react';
import type { StudentResult, CategoryScore } from '../types';
import { formatAccuracy } from '../utils/formatUtils';
import { getSkippedQuestions } from '../utils/rankUtils';

interface ScoreCardProps {
  result: StudentResult;
}

const CategoryScoreCard = ({ title, score, icon: Icon }: { 
  title: string; 
  score: CategoryScore; 
  icon: React.ElementType;
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center gap-2 text-gray-700 mb-3">
      <Icon className="h-5 w-5" />
      <h3 className="font-semibold">{title}</h3>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Accuracy</span>
        <span className="font-semibold">{formatAccuracy(score.accuracy)}%</span>
      </div>
      <div className="flex justify-between">
        <span>Score</span>
        <span className="font-semibold">{score.correct}/{score.total}</span>
      </div>
    </div>
  </div>
);

export function ScoreCard({ result }: ScoreCardProps) {
  const { testResults, userDetails, timestamp } = result;
  const skippedQuestions = getSkippedQuestions(result);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto w-full">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{userDetails.name}</h2>
        <div className="mt-2 text-gray-600 grid grid-cols-2 md:grid-cols-3 gap-2">
          <p>Register: {userDetails.registerNumber}</p>
          <p>Branch: {userDetails.branch.toUpperCase()}</p>
          <p>Year: {userDetails.yearOfStudy}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Trophy className="h-5 w-5" />
            <h3 className="font-semibold">Overall Score</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{formatAccuracy(testResults.accuracy)}%</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-semibold">Questions</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {testResults.correctAnswers}/{testResults.totalQuestions}
          </p>
        </div>

        {skippedQuestions > 0 && (
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-semibold">Skipped Questions</h3>
            </div>
            <p className="text-2xl font-bold text-red-700">{skippedQuestions}</p>
          </div>
        )}

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Trophy className="h-5 w-5" />
            <h3 className="font-semibold">Test Date</h3>
          </div>
          <p className="text-lg font-bold text-orange-700">
            {new Date(timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CategoryScoreCard
          title="Coding Performance"
          score={testResults.categoryScores.CODING}
          icon={Code}
        />
        <CategoryScoreCard
          title="Verbal Performance"
          score={testResults.categoryScores.VERBAL}
          icon={MessageSquare}
        />
        <CategoryScoreCard
          title="Logical Performance"
          score={testResults.categoryScores.LOGICAL}
          icon={Lightbulb}
        />
        <CategoryScoreCard
          title="Quantitative Performance"
          score={testResults.categoryScores.QUANTITATIVE}
          icon={Calculator}
        />
      </div>
    </div>
  );
}