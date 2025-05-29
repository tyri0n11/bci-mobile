import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, commonStyles } from '../theme';

const feelingsList = [
  'Education', 'Works', 'Health',
  'Partner', 'Dating', 
  'Weather', 'Money', 
  'Family', 'Friend', 'Community', 
  'Tasks' , 'Hobbies', 'Travel',
  'Food', 'Pets', 'Sleep'
];

export default function DescribeImpactScreen({ navigation }: any) {
  const [showMore, setShowMore] = useState(false);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);

  const displayedFeelings = showMore ? feelingsList : feelingsList.slice(0, 10);

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Nav */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>What has the biggest impact?</Text>
      <View style={styles.divider} />

      {/* Feeling Buttons */}
      <View style={styles.feelingsContainer}>
        {displayedFeelings.map((feeling, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleFeeling(feeling)}
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

      {/* Show More */}
      <TouchableOpacity onPress={() => setShowMore(!showMore)}>
        <Text style={styles.showMore}>
          {showMore ? 'Show less ▲' : 'Show more ▼'}
        </Text>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  topNav: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    alignSelf: 'center',
    color: colors.text.primary,
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
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.medium,
  },
});
