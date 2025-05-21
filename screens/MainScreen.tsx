import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

const MainScreen = () => {
  const [currentMood, setCurrentMood] = useState('Calm');
  const [moodScore, setMoodScore] = useState(75);

  // Mock data for the chart
  const data = {
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

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#6366f1'
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.moodCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Current State of Mind</Text>
          <View style={styles.moodIndicator}>
            <Text style={styles.moodText}>{currentMood}</Text>
            <View style={styles.moodScoreContainer}>
              <Text style={styles.moodScore}>{moodScore}</Text>
              <Text style={styles.moodScoreLabel}>/100</Text>
            </View>
          </View>
          <Paragraph style={styles.moodDescription}>
            Your mood has been consistently positive over the past week. Keep up the good work!
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Mood History</Title>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <Text style={styles.chartDescription}>
            Your weekly mood trend shows improvement. Your highest score was on Saturday.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.insightsCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Insights</Text>
          <View style={styles.insightItem}>
            <Text style={styles.insightTitle}>Sleep Quality</Text>
            <Text style={styles.insightValue}>Good</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightTitle}>Stress Level</Text>
            <Text style={styles.insightValue}>Low</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightTitle}>Activity Level</Text>
            <Text style={styles.insightValue}>Moderate</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  moodCard: {
    marginBottom: 15,
    elevation: 2,
    borderRadius: 10,
  },
  chartCard: {
    marginBottom: 15,
    elevation: 2,
    borderRadius: 10,
  },
  insightsCard: {
    marginBottom: 15,
    elevation: 2,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  moodIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  moodText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  moodScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  moodScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  moodScoreLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 2,
  },
  moodDescription: {
    color: '#666',
    marginTop: 5,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartDescription: {
    color: '#666',
    marginTop: 5,
  },
  insightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  insightTitle: {
    fontSize: 16,
    color: '#333',
  },
  insightValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
});

export default MainScreen;