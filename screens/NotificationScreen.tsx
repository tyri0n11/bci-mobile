import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, commonStyles } from '../theme';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.message}>You have no new notifications.</Text>
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
  message: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
  },
});
