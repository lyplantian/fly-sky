import { createContext, useContext } from 'react';
import { useStarBuddy } from '../hooks/useStarBuddy';

const StarBuddyContext = createContext(null);

export function StarBuddyProvider({ children }) {
  const starBuddy = useStarBuddy();
  
  return (
    <StarBuddyContext.Provider value={starBuddy}>
      {children}
    </StarBuddyContext.Provider>
  );
}

export function useStarBuddyContext() {
  const context = useContext(StarBuddyContext);
  if (!context) {
    throw new Error('useStarBuddyContext must be used within a StarBuddyProvider');
  }
  return context;
}
