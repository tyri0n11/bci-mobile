import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, commonStyles } from '../theme';

const DeviceStatusScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DEVICE STATUS</Text>
      <Text style={styles.status}>Connected</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  status: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.text.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
  },
});

export default DeviceStatusScreen;