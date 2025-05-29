import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Emotion = {
  name: string;
  image: any;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
};

type EmotionContextType = {
  selectedEmotion: Emotion | null;
  selectedFeelings: string[];
  selectedImpacts: string[];
  setSelectedEmotion: (emotion: Emotion) => void;
  setSelectedFeelings: (feelings: string[]) => void;
  setSelectedImpacts: (impacts: string[]) => void;
  resetSession: () => void;
};

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const EmotionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>([]);

  const resetSession = () => {
    setSelectedEmotion(null);
    setSelectedFeelings([]);
    setSelectedImpacts([]);
  };

  return (
    <EmotionContext.Provider
      value={{
        selectedEmotion,
        selectedFeelings,
        selectedImpacts,
        setSelectedEmotion,
        setSelectedFeelings,
        setSelectedImpacts,
        resetSession,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};

export const useEmotion = () => {
  const context = useContext(EmotionContext);
  if (context === undefined) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
}; 