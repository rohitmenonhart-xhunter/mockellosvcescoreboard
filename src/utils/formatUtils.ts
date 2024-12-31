export const formatAccuracy = (accuracy: number): string => {
  return accuracy.toFixed(2);
};

export const formatTime = (seconds: number): string => {
  // Convert to minutes and seconds only
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
};