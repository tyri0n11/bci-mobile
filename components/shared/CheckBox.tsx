import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onPress, label, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={[styles.box, checked && styles.boxChecked, disabled && styles.boxDisabled]}>
        {checked && <View style={styles.innerBox} />}
      </View>
      {label && <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  innerBox: {
    width: 10,
    height: 10,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  boxDisabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
  },
  labelDisabled: {
    color: colors.text.secondary,
    opacity: 0.5,
  },
});

export default CheckBox; 