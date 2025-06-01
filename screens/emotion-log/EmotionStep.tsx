import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Emotion } from '../../contexts/EmotionContext';

interface EmotionStepProps {
  selectedEmotion: Emotion | null;
  loading: boolean;
  loadingOpacity: Animated.Value;
  contentOpacity: Animated.Value;
  imageScale: Animated.Value;
  titleSlide: Animated.Value;
  emotionSlide: Animated.Value;
  dotCount: number;
  onNext: () => void;
  animateKey: any;
}

const EmotionStep: React.FC<EmotionStepProps> = ({
  selectedEmotion,
  loading,
  loadingOpacity,
  contentOpacity,
  imageScale,
  titleSlide,
  emotionSlide,
  dotCount,
  onNext,
  animateKey,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  // Animated wave dots
  const dotAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(40);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [animateKey]);

  useEffect(() => {
    let running = true;
    if (loading) {
      const createDotAnim = (anim, delay) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: -14,
              duration: 180,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 180,
              useNativeDriver: true,
            }),
            Animated.delay(180 * (dotAnims.length - 1 - delay / 120)),
          ])
        );
      const anims = dotAnims.map((anim, i) => createDotAnim(anim, i * 120));
      anims.forEach(anim => anim.start());
      return () => {
        running = false;
        anims.forEach(anim => anim.stop());
      };
    }
  }, [loading]);

  return (
    <Animated.View style={{ flex: 1, opacity, transform: [{ translateY }] }}>
      <View style={[styles.container, { backgroundColor: selectedEmotion?.backgroundColor }]}> 
        {loading && (
          <Animated.View style={[styles.loadingContainer, { opacity: loadingOpacity }]}> 
            <Text style={{
              fontSize: typography.sizes.large,
              color: colors.text.secondary,
              textAlign: 'center',
              marginBottom: 8,
              fontWeight: typography.weights.medium,
            }}>
              AI is analyzing your state of mind
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', height: 60 }}>
              {dotAnims.map((anim, i) => (
                <Animated.Text
                  key={i}
                  style={{
                    fontSize: 48,
                    color: colors.primary,
                    marginHorizontal: 6,
                    fontWeight: 'bold',
                    transform: [{ translateY: anim }],
                  }}
                >
                  .
                </Animated.Text>
              ))}
            </View>
          </Animated.View>
        )}
        <Animated.View style={{ opacity: contentOpacity, flex: 1, width: '100%' }}>
          <View style={styles.content}>
            <Animated.Text 
              style={[
                styles.title, 
                { 
                  color: selectedEmotion?.textColor,
                  transform: [{ translateY: titleSlide }],
                  opacity: contentOpacity
                }
              ]}
            >
              Based on collected data,{"\n"}you're feeling
            </Animated.Text>
            <Animated.Image 
              source={selectedEmotion?.image} 
              style={[
                styles.image,
                {
                  transform: [{ scale: imageScale }],
                }
              ]} 
            />
            <Animated.Text 
              style={[
                styles.emotion, 
                { 
                  color: selectedEmotion?.textColor,
                  transform: [{ translateY: emotionSlide }],
                  opacity: contentOpacity
                }
              ]}
            >
              {selectedEmotion?.name}
            </Animated.Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: selectedEmotion?.buttonColor }]} 
            onPress={onNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  emotion: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  button: {
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    zIndex: 2,
  },
});

export default EmotionStep; 