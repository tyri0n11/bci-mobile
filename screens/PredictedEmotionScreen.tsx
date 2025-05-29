// screens/PredictedEmotionScreen.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, commonStyles } from '../theme';

export default function PredictedEmotionScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [dotCount, setDotCount] = useState(1);
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fade out loading
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setLoading(false);
        // Fade in result
        Animated.timing(resultOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const dotTimer = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);
    return () => clearInterval(dotTimer);
  }, [loading]);

  return (
    <View style={styles.container}>
      {loading && (
        <Animated.View style={[styles.loadingContainer, { opacity: loadingOpacity, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, backgroundColor: colors.white }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 20, color: colors.primary, fontWeight: 'bold' }}>
            {`Analyzing your mood${'.'.repeat(dotCount)}`}
          </Text>
        </Animated.View>
      )}
      <Animated.View style={{ opacity: resultOpacity, flex: 1, width: '100%' }}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Based on collected data,{"\n"}you're feeling</Text>
          <Image source={require('../assets/unpleasant_mindly.png')} style={styles.image} />
          <Text style={styles.emotion}>Unpleasant</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DescribeFeeling')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    marginBottom: spacing.sm,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  emoji: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  image: {
    width: 160,
    height: 160,
    marginVertical: spacing.xl,
  },
  emotion: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xl,
    textAlign: 'center',
    color: colors.text.primary,
  },
  button: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

