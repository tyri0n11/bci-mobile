import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#6366f1',
  secondary: '#e5e7eb',
  background: '#f5f5f5',
  text: {
    primary: '#333',
    secondary: '#666',
    light: '#999',
  },
  border: '#e5e7eb',
  white: '#ffffff',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  sizes: {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 24,
    xxlarge: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  cardContent: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
}); 