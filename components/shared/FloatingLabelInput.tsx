import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  error,
  value,
  onFocus,
  onBlur,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isActive = isFocused || Boolean(value);

  return (
    <View style={[styles.container, style]}>
      <Text
        style={[
          styles.label,
          isActive && styles.labelActive,
          error && styles.labelError,
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={colors.text.light}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    position: 'absolute',
    left: spacing.sm,
    top: spacing.sm,
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xs,
    zIndex: 1,
  },
  labelActive: {
    color: colors.primary,
    fontSize: typography.sizes.small,
    top: -spacing.xs,
  },
  labelError: {
    color: '#ef4444',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: typography.sizes.small,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
}); 