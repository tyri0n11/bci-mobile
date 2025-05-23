import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Card } from '../components/shared/Card';
import { colors, spacing, typography } from '../theme';
import { ChartData, Insight, MoodData } from '../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const screenWidth = Dimensions.get('window').width;

const MainScreen = () => {
  const [currentMood, setCurrentMood] = useState<MoodData>({
    mood: 'Calm',
    score: 75,
    timestamp: new Date(),
  });

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
    { title: 'Sleep Quality', value: 'Good', category: 'sleep' },
    { title: 'Stress Level', value: 'Low', category: 'stress' },
    { title: 'Activity Level', value: 'Moderate', category: 'activity' },
  ];

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Card>
        <Text style={styles.cardTitle}>Current State of Mind</Text>
        <View style={styles.moodIndicator}>
          <Text style={styles.moodText}>{currentMood.mood}</Text>
          <View style={styles.moodScoreContainer}>
            <Text style={styles.moodScore}>{currentMood.score}</Text>
            <Text style={styles.moodScoreLabel}>/100</Text>
          </View>
        </View>
        <Text style={styles.moodDescription}>
          Your mood has been consistently positive over the past week. Keep up the good work!
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Mood History</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <Text style={styles.chartDescription}>
          Your weekly mood trend shows improvement. Your highest score was on Saturday.
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Insights</Text>
        {insights.map((insight, index) => (
          <View key={insight.title} style={styles.insightItem}>
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <Text style={styles.insightValue}>{insight.value}</Text>
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
    color: colors.primary,
  },
  moodScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  moodScore: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.primary,
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
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  chartDescription: {
    color: colors.text.secondary,
    marginTop: spacing.xs,
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
});

export default MainScreen;