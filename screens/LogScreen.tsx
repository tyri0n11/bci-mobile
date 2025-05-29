import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { colors, spacing, typography, commonStyles } from '../theme';



export default function LogScreen({ navigation }: any) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740' }} />
      <Text style={styles.title}>Log an Emotion</Text>
      <Text style={styles.subtitle}>How you feel right now ?</Text>
      <Text style={styles.date}>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</Text>
      <Text style={styles.time}>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PredictedEmotion')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: spacing.md,
  },
  date: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  time: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  button: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
  },
});
