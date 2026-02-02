/**
 * Batch Tracking System
 * Tracks registration batches and positions
 * Each batch has 20 positions (1-20)
 * After 20 registrations, moves to next batch
 */

const BATCH_STORAGE_KEY = 'smart_assign_batch_data';
const POSITIONS_PER_BATCH = 20;

interface BatchData {
  currentBatch: number;
  currentPosition: number;
}

interface StoredData {
  batch: number;
  position: number;
}

/**
 * Get current batch and position from localStorage
 */
export const getCurrentBatchData = (): BatchData => {
  try {
    const stored = localStorage.getItem(BATCH_STORAGE_KEY);
    if (stored) {
      const data: StoredData = JSON.parse(stored);
      return {
        currentBatch: data.batch || 7,
        currentPosition: data.position || 0
      };
    }
  } catch (error) {
    console.error('Error reading batch data:', error);
  }
  
  // Default: Start with Batch #7, Position 0 (will become 1 on first registration)
  return {
    currentBatch: 7,
    currentPosition: 0
  };
};

/**
 * Register a new user and return their batch number and position
 */
export const registerNewUser = (): BatchData => {
  const data = getCurrentBatchData();
  
  // Increment position
  let newPosition = data.currentPosition + 1;
  let newBatch = data.currentBatch;
  
  // If position exceeds 20, move to next batch
  if (newPosition > POSITIONS_PER_BATCH) {
    newBatch = newBatch + 1;
    newPosition = 1; // Reset to position 1 for new batch
  }
  
  // Save to localStorage (using the format expected by Careers.tsx)
  const storedData: StoredData = {
    batch: newBatch,
    position: newPosition
  };
  
  try {
    localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(storedData));
  } catch (error) {
    console.error('Error saving batch data:', error);
  }
  
  return {
    currentBatch: newBatch,
    currentPosition: newPosition
  };
};

/**
 * Get batch info for display
 */
export const getBatchInfo = (): { batchNumber: number; position: number } => {
  const data = getCurrentBatchData();
  return {
    batchNumber: data.currentBatch,
    position: data.currentPosition
  };
};

/**
 * Reset position to 0 for current batch (keeps batch number)
 */
export const resetPosition = (): void => {
  const data = getCurrentBatchData();
  const resetData: StoredData = {
    batch: data.currentBatch,
    position: 0
  };
  
  try {
    localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(resetData));
    console.log(`Position reset to 0 for Batch #${resetData.batch}`);
  } catch (error) {
    console.error('Error resetting position:', error);
  }
};

/**
 * Reset both batch and position (starts fresh from Batch 7, Position 0)
 */
export const resetBatchAndPosition = (): void => {
  const resetData: StoredData = {
    batch: 7,
    position: 0
  };
  
  try {
    localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(resetData));
    console.log('Batch and position reset to Batch #7, Position 0');
  } catch (error) {
    console.error('Error resetting batch and position:', error);
  }
};

