import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface ImpactStepProps {
  impactList: string[];
  selectedImpacts: string[];
  showMoreImpacts: boolean;
  onToggleImpact: (impact: string) => void;
  onShowMore: () => void;
  onDone: () => void;
  imageScale: Animated.Value;
  animateKey: any;
}

const ImpactStep: React.FC<ImpactStepProps> = ({
  impactList,
  selectedImpacts,
  showMoreImpacts,
  onToggleImpact,
  onShowMore,
  onDone,
  imageScale,
  animateKey,
}) => {
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
      <View style={styles.container}>
        <Text style={styles.title}>What has the biggest impact?</Text>
        <View style={styles.divider} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.feelingsContainer}>
            {(showMoreImpacts ? impactList : impactList.slice(0, 10)).map((impact, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onToggleImpact(impact)}
                style={[
                  styles.feelingButton,
                  selectedImpacts.includes(impact) && styles.feelingButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.feelingText,
                    selectedImpacts.includes(impact) && styles.feelingTextSelected,
                  ]}
                >
                  {impact}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={onShowMore}>
            <Text style={styles.showMore}>
              {showMoreImpacts ? 'Show less ▲' : 'Show more ▼'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Animated.View style={{ transform: [{ scale: imageScale }] }}>
          <TouchableOpacity style={styles.button} onPress={onDone}>
            <Text style={styles.buttonText}>Done</Text>
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
  title: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: colors.text.primary,
  },
  divider: {
    height: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    marginBottom: spacing.xl,
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

export default ImpactStep; 