import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface InitialStepProps {
  onStart: () => void;
  currentTime: Date;
  animateKey: any;
}

const InitialStep: React.FC<InitialStepProps> = ({ onStart, currentTime, animateKey }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(40);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [animateKey]);

  return (
    <Animated.View style={{ flex: 1, opacity, transform: [{ translateY }] }}>
      <View style={styles.initialContainer}>
        <Image style={styles.image} source={require('../../assets/neutral_mindly.png')} />
        <Text style={styles.title}>Log an Emotion</Text>
        <Text style={styles.subtitle}>How you feel right now ?</Text>
        <Text style={styles.date}>
          {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
        </Text>
        <Text style={styles.time}>
          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Text>
        <View style={{ height: 32 }} />
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  date: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  time: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.medium,
  },
});

export default InitialStep; 