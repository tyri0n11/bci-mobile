import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface FeelingsStepProps {
  feelingsList: string[];
  selectedFeelings: string[];
  showMoreFeelings: boolean;
  onToggleFeeling: (feeling: string) => void;
  onShowMore: () => void;
  onNext: () => void;
  animateKey: any;
}

const FeelingsStep: React.FC<FeelingsStepProps> = ({
  feelingsList,
  selectedFeelings,
  showMoreFeelings,
  onToggleFeeling,
  onShowMore,
  onNext,
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
        <Text style={styles.title}>Words describe this feeling</Text>
        <View style={styles.divider} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.feelingsContainer}>
            {(showMoreFeelings ? feelingsList : feelingsList.slice(0, 10)).map((feeling, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onToggleFeeling(feeling)}
                style={[
                  styles.feelingButton,
                  selectedFeelings.includes(feeling) && styles.feelingButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.feelingText,
                    selectedFeelings.includes(feeling) && styles.feelingTextSelected,
                  ]}
                >
                  {feeling}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={onShowMore}>
            <Text style={styles.showMore}>
              {showMoreFeelings ? 'Show less ▲' : 'Show more ▼'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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

export default FeelingsStep; 