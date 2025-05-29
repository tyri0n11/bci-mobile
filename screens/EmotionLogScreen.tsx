import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Animated, Easing, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { useEmotion } from '../contexts/EmotionContext';
import InitialStep from './emotion-log/InitialStep';
import EmotionStep from './emotion-log/EmotionStep';
import FeelingsStep from './emotion-log/FeelingsStep';
import ImpactStep from './emotion-log/ImpactStep';

type Emotion = {
  name: string;
  image: any;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
};

const emotions: Emotion[] = [
  {
    name: 'Neutral',
    image: require('../assets/neutral_mindly.png'),
    backgroundColor: colors.background,
    textColor: colors.text.primary,
    buttonColor: colors.primary,
  },
  {
    name: 'Grateful',
    image: require('../assets/grateful_mindly.png'),
    backgroundColor: '#E8F5E9',
    textColor: '#2E7D32',
    buttonColor: '#4CAF50',
  },
  {
    name: 'Unpleasant',
    image: require('../assets/unpleasant_mindly.png'),
    backgroundColor: '#FFEBEE',
    textColor: '#C62828',
    buttonColor: '#EF5350',
  },
];

const feelingsList = [
  'Angry', 'Anxious', 'Scared',
  'Overwhelmed', 'Ashamed', 'Embarrassed',
  'Annoyed', 'Stressed', 'Worried', 'Sad',
  'Lonely', 'Frustrated', 'Hopeless', 'Helpless', 'Guilty'
];

const impactList = [
  'Education', 'Works', 'Health',
  'Partner', 'Dating', 
  'Weather', 'Money', 
  'Family', 'Friend', 'Community', 
  'Tasks' , 'Hobbies', 'Travel',
  'Food', 'Pets', 'Sleep'
];

type Step = 'initial' | 'emotion' | 'feelings' | 'impact';

export default function EmotionLogScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  const [loading, setLoading] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const [showMoreFeelings, setShowMoreFeelings] = useState(false);
  const [showMoreImpacts, setShowMoreImpacts] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stepAnimKey, setStepAnimKey] = useState(0);
  
  const { 
    selectedEmotion, 
    setSelectedEmotion,
    selectedFeelings,
    setSelectedFeelings,
    selectedImpacts,
    setSelectedImpacts,
    resetSession
  } = useEmotion();

  // Animation values
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.5)).current;
  const titleSlide = useRef(new Animated.Value(50)).current;
  const emotionSlide = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset step when screen mounts
  useEffect(() => {
    setCurrentStep('initial');
  }, []);

  useEffect(() => {
    if (currentStep === 'emotion') {
      // Reset animation values
      loadingOpacity.setValue(1);
      contentOpacity.setValue(0);
      imageScale.setValue(0.5);
      titleSlide.setValue(50);
      emotionSlide.setValue(50);

      setLoading(true);
      const randomIndex = Math.floor(Math.random() * emotions.length);
      setSelectedEmotion(emotions[randomIndex]);

      const timer = setTimeout(() => {
        Animated.timing(loadingOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setLoading(false);
          Animated.parallel([
            Animated.timing(contentOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.spring(imageScale, {
              toValue: 1,
              friction: 8,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(titleSlide, {
              toValue: 0,
              duration: 600,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(emotionSlide, {
              toValue: 0,
              duration: 600,
              delay: 200,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start();
        });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (loading) {
      const dotTimer = setInterval(() => {
        setDotCount((prev) => (prev % 3) + 1);
      }, 500);
      return () => clearInterval(dotTimer);
    }
  }, [loading]);

  useEffect(() => {
    setStepAnimKey((k) => k + 1);
  }, [currentStep]);

  const handleStart = () => {
    setCurrentStep('emotion');
  };
  const handleDone = () => {
    resetSession();
    setCurrentStep('initial');
    navigation.navigate('Home');
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'emotion':
        setCurrentStep('feelings');
        break;
      case 'feelings':
        setCurrentStep('impact');
        break;
    }
  };

  const toggleFeeling = (feeling: string) => {
    if (selectedFeelings.includes(feeling)) {
      setSelectedFeelings(selectedFeelings.filter((f) => f !== feeling));
    } else {
      setSelectedFeelings([...selectedFeelings, feeling]);
    }
  };

  const toggleImpact = (impact: string) => {
    if (selectedImpacts.includes(impact)) {
      setSelectedImpacts(selectedImpacts.filter((i) => i !== impact));
    } else {
      setSelectedImpacts([...selectedImpacts, impact]);
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <InitialStep onStart={handleStart} currentTime={currentTime} animateKey={stepAnimKey} />
        );
      case 'emotion':
        return (
          <EmotionStep
            selectedEmotion={selectedEmotion}
            loading={loading}
            loadingOpacity={loadingOpacity}
            contentOpacity={contentOpacity}
            imageScale={imageScale}
            titleSlide={titleSlide}
            emotionSlide={emotionSlide}
            dotCount={dotCount}
            onNext={handleNext}
            animateKey={stepAnimKey}
          />
        );
      case 'feelings':
        return (
          <FeelingsStep
            feelingsList={feelingsList}
            selectedFeelings={selectedFeelings}
            showMoreFeelings={showMoreFeelings}
            onToggleFeeling={toggleFeeling}
            onShowMore={() => setShowMoreFeelings(!showMoreFeelings)}
            onNext={handleNext}
            animateKey={stepAnimKey}
          />
        );
      case 'impact':
        return (
          <ImpactStep
            impactList={impactList}
            selectedImpacts={selectedImpacts}
            showMoreImpacts={showMoreImpacts}
            onToggleImpact={toggleImpact}
            onShowMore={() => setShowMoreImpacts(!showMoreImpacts)}
            onDone={handleDone}
            imageScale={imageScale}
            animateKey={stepAnimKey}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
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
  scrollView: {
    flex: 1,
    marginBottom: spacing.xl,
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
  emotion: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xl,
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    zIndex: 2,
  },
  divider: {
    height: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
    width: '100%',
  },
  feelingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  feelingButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    margin: spacing.xs,
  },
  feelingButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  feelingText: {
    color: colors.text.primary,
  },
  feelingTextSelected: {
    color: colors.white,
  },
  showMore: {
    textAlign: 'center',
    color: colors.primary,
    marginVertical: spacing.md,
    fontWeight: typography.weights.medium,
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
  },
}); 