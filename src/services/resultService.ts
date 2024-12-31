import { ref, get, query, orderByChild, onValue, off } from 'firebase/database';
import { db } from '../config/firebase';
import type { StudentResult } from '../types';

export const resultService = {
  async getStudentResult(registerNumber: string): Promise<StudentResult | null> {
    try {
      const resultRef = ref(db, `results/${registerNumber}`);
      const snapshot = await get(resultRef);
      
      if (snapshot.exists()) {
        return snapshot.val() as StudentResult;
      }
      return null;
    } catch (error) {
      console.error('Error fetching student result:', error);
      throw error;
    }
  },

  subscribeToResults(callback: (results: StudentResult[]) => void): () => void {
    const resultsRef = ref(db, 'results');
    
    const handleData = (snapshot: any) => {
      if (snapshot.exists()) {
        const results: StudentResult[] = [];
        snapshot.forEach((childSnapshot: any) => {
          results.push(childSnapshot.val() as StudentResult);
        });
        callback(results);
      } else {
        callback([]);
      }
    };

    onValue(resultsRef, handleData);
    
    // Return cleanup function
    return () => off(resultsRef);
  }
};