import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { ScoreCard } from './components/ScoreCard';
import { Leaderboard } from './components/Leaderboard';
import { GraduationCap } from 'lucide-react';
import type { StudentResult } from './types';
import { resultService } from './services/resultService';

export default function App() {  // Added default export
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [allResults, setAllResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = resultService.subscribeToResults(setAllResults);
    return () => unsubscribe();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a register number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await resultService.getStudentResult(searchQuery);
      if (result) {
        setSelectedResult(result);
      } else {
        setError('No results found for this register number');
      }
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      setSelectedResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLeaderboard = () => {
    setSelectedResult(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Student Score Dashboard
            </h1>
          </div>
          
          <div className="max-w-md mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading results...</p>
          </div>
        ) : selectedResult ? (
          <div>
            <button
              onClick={handleBackToLeaderboard}
              className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              ← Back to Leaderboard
            </button>
            <ScoreCard result={selectedResult} />
          </div>
        ) : (
          <Leaderboard results={allResults} />
        )}
      </div>
    </div>
  );
}