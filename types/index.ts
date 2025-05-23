export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
}

export interface MoodData {
  mood: string;
  score: number;
  timestamp: Date;
}

export interface Insight {
  title: string;
  value: string;
  category: 'sleep' | 'stress' | 'activity' | 'other';
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
    strokeWidth: number;
  }[];
  legend: string[];
} 