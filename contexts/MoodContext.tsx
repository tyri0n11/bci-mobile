import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MoodContextType {
  moodScore: number;
  setMoodScore: (score: number) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [moodScore, setMoodScore] = useState(10);
  return (
    <MoodContext.Provider value={{ moodScore, setMoodScore }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) throw new Error('useMood must be used within a MoodProvider');
  return context;
}; 