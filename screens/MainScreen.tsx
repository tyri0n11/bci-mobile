import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from '../components/shared/Card';
import { colors, spacing, typography } from '../theme';
import { ChartData, Insight, MoodData } from '../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMood } from '../contexts/MoodContext';
import EEGChart from '../components/shared/EEGChart';
import { useBluetooth } from '../contexts/BluetoothContext';

const screenWidth = Dimensions.get('window').width;
const CARD_HORIZONTAL_PADDING = spacing.md * 2; // Card has padding on both sides
const CHART_WIDTH = screenWidth - CARD_HORIZONTAL_PADDING - 16; // 16 for card's border radius/margin

const getMoodColor = (score: number): string => {
  // Round score to nearest 5
  const roundedScore = Math.round(score / 5) * 5;
  
  // Map scores to mood colors
  const scoreToColor: { [key: number]: string } = {
    0: colors.mood.veryLow,
    5: colors.mood.low,
    10: colors.mood.lowMedium,
    15: colors.mood.mediumLow,
    20: colors.mood.medium,
    25: colors.mood.mediumHigh,
    30: colors.mood.highMedium,
    35: colors.mood.high,
    40: colors.mood.veryHigh,
    45: colors.mood.excellent,
    50: colors.mood.great,
    55: colors.mood.superb,
    60: colors.mood.amazing,
    65: colors.mood.outstanding,
    70: colors.mood.exceptional,
    75: colors.mood.incredible,
    80: colors.mood.perfect,
    85: colors.mood.master,
    90: colors.mood.legendary,
    95: colors.mood.godlike,
    100: colors.mood.ultimate,
  };

  return scoreToColor[roundedScore];
};

const getComponentColor = (baseScore: number, componentScore: number): string => {
  const difference = Math.abs(baseScore - componentScore);
  if (difference >= 20) {
    return getMoodColor(componentScore);
  }
  return colors.primary;
};

function blendWithWhite(hex: string, percent: number) {
  // percent: 0 (no blend), 1 (full white)
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  const r = Math.round((1 - percent) * parseInt(c.substring(0,2),16) + percent * 255);
  const g = Math.round((1 - percent) * parseInt(c.substring(2,4),16) + percent * 255);
  const b = Math.round((1 - percent) * parseInt(c.substring(4,6),16) + percent * 255);
  return `rgb(${r},${g},${b})`;
}

function isDarkColor(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  const r = parseInt(c.substring(0,2),16);
  const g = parseInt(c.substring(2,4),16);
  const b = parseInt(c.substring(4,6),16);
  // Perceived brightness
  const brightness = (r*0.299 + g*0.587 + b*0.114);
  if (brightness > 100) return false; // rất sáng, luôn dùng chữ đen
  return brightness < 210;
}
function getMood(score: number) {
  if (score < 10) {
    return "Very Unpleasant";
  } else if (score < 20) {
    return "Moderately Unpleasant";
  } else if (score < 30) {
    return "Slightly Unpleasant";
  } else if (score < 40) {
    return "Slightly Unpleasant";
  } else if (score < 50) {
    return "Neutral";
  } else if (score < 60) {
    return "Slightly Pleasant";
  } else if (score < 70) {
    return "Slightly Pleasant";
  } else if (score < 80) {
    return "Moderately Pleasant";
  } else {
    return "Very Pleasant";
  }
}
function getMoodSuggestion(score: number) {
  if (score < 30) {
    return "Try some light exercise, chat with Mindly AI, or meditate to improve your mood!";
  } else if (score < 70) {
    return "Your mood is stable. Keep up your good habits and try adding more positive activities!";
  } else {
    return "Awesome! Keep maintaining this positive energy and spread it to those around you!";
  }
}

// Thêm dữ liệu mẫu EEG (8 kênh, 100 điểm)
const eegData = Array.from({ length: 8 }, (_, ch) =>
  Array.from({ length: 100 }, (_, i) =>
    4 + 2 * Math.sin(i / 8 + ch) + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)
  )
);

const MainScreen = () => {
  const { moodScore, setMoodScore } = useMood();
  const [currentMood, setCurrentMood] = useState<MoodData>({
    mood: 'Neutral',
    score: moodScore,
    timestamp: new Date(),
  });
  const [isDemo, setIsDemo] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const demoScoreRef = useRef(moodScore);
  const { connectionStatus } = useBluetooth();

  useEffect(() => {
    setCurrentMood((m) => ({ ...m, score: moodScore, mood: getMood(moodScore) }));
  }, [moodScore]);

  useEffect(() => {
    if (isDemo) {
      setCurrentMood((m) => ({ ...m, score: 0 }));
      setMoodScore(0);
      demoScoreRef.current = 0;
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        let next = demoScoreRef.current + 1;
        if (next > 100) next = 0;
        demoScoreRef.current = next;
        setMoodScore(next);
      }, 100);
    } else {
      intervalRef.current && clearInterval(intervalRef.current);
    }
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [isDemo, setMoodScore]);

  const chartData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 70, 60, 80, 75, 85, 75],
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Mood Score']
  };

  const insights: Insight[] = [
    { title: 'Sleep Quality', value: 'Good', category: 'sleep', score: 80 },
    { title: 'Stress Level', value: 'Low', category: 'stress', score: 85 },
    { title: 'Activity Level', value: 'Moderate', category: 'activity', score: 65 },
  ];

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => getMoodColor(currentMood.score),
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: getMoodColor(currentMood.score),
      fill: getMoodColor(currentMood.score),
    },
    fillShadowGradient: blendWithWhite(getMoodColor(currentMood.score), 0.7),
    fillShadowGradientOpacity: 1,
  };

  const moodBg = blendWithWhite(getMoodColor(currentMood.score), 0.7); // 70% trắng
  const moodTextColor = isDarkColor(getMoodColor(currentMood.score)) ? '#fff' : colors.text.primary;

  const bgColor = blendWithWhite(getMoodColor(moodScore), 0.9); // 90% trắng

  return (
    <KeyboardAwareScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <Card style={{
        ...styles.moodCard,
        backgroundColor: moodBg,
        borderRadius: 24,
        ...(Platform.OS === 'android'
          ? { elevation: 6 }
          : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8 })
      }}>
        <Text style={[styles.cardTitle, { color: moodTextColor }]}>Current State of Mind</Text>
        <View style={styles.moodIndicator}>
          <Text style={[styles.moodText, { color: moodTextColor }]}>{currentMood.mood}</Text>
          <View style={styles.moodScoreContainer}>
            <Text style={[styles.moodScore, { color: moodTextColor }]}>{currentMood.score}</Text>
            <Text style={[styles.moodScoreLabel, { color: moodTextColor } ]}>/100</Text>
          </View>
        </View>
        <Text style={[styles.moodDescription, { color: moodTextColor, opacity: 0.85 }] }>
          {getMoodSuggestion(moodScore)}
        </Text>
        <TouchableOpacity style={{ alignItems: 'center', padding: 10 }}
        onPress={() => setIsDemo((d) => !d)}
        >
          <Text
            style={{ color: isDemo ? colors.success : colors.primary, fontSize: 1,  fontWeight: '400'}}
          >
            {isDemo ? 'Turn off Demo' : 'Turn on Demo'}
          </Text>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>EEG Signal</Text>
        <EEGChart width={350} height={180} isConnected={connectionStatus === 'connected'} />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>Mood History</Text>
        <View style={styles.chartContainer}>
          <LineChart
            key={moodScore}
            data={chartData}
            width={CHART_WIDTH}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
        <Text style={styles.chartDescription}>
          Your weekly mood trend shows improvement. Your highest score was on Saturday.
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Insights</Text>
        {insights.map((insight, index) => (
          <View key={insight.title} style={styles.insightItem}>
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <Text style={[styles.insightValue, { color: getComponentColor(currentMood.score, insight.score) }]}>
              {insight.value}
            </Text>
          </View>
        ))}
      </Card>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  moodIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  moodText: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
  },
  moodScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  moodScore: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
  },
  moodScoreLabel: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  moodDescription: {
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  chartContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  chart: {
    width: CHART_WIDTH,
    marginLeft: -36,
    borderRadius: 16,
  },
  chartDescription: {
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  insightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  insightTitle: {
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
  },
  insightValue: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  moodCard: {
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 0,
  },
});

export default MainScreen;