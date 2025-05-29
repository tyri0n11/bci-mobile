import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#6366f1',
  secondary: '#e5e7eb',
  background: '#f5f5f5',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#0ea5e9',
  light: '#f3f4f6',
  dark: '#1f2937',
  muted: '#6b7280',
  gray: '#9ca3af',
  black: '#111827',
  white: '#ffffff',
  transparent: 'transparent',
  text: {
    primary: '#333',
    secondary: '#666',
    light: '#999',
  },
  border: '#e5e7eb',
  mood: {
    // Low scores (0-25)
    veryLow: '#4a148c',    // Dark purple (0)
    low: '#5e35b1',       // Deep purple (5)
    lowMedium: '#3949ab', // Royal blue (10)
    mediumLow: '#1e88e5', // Blue (15)
    medium: '#039be5',    // Cyan (20)
    mediumHigh: '#00acc1', // Teal (25)
    
    // Middle scores (30-55)
    highMedium: '#00897b', // Green-teal (30)
    high: '#43a047',      // Green (35)
    veryHigh: '#7cb342',  // Bright green (40)
    excellent: '#c0ca33', // Yellow-green (45)
    great: '#fdd835',     // Lime (50)
    superb: '#ffb300',    // Yellow (55)
    
    // High scores (60-100)
    amazing: '#fb8c00',   // Orange-yellow (60)
    outstanding: '#f57c00', // Orange (65)
    exceptional: '#ef6c00', // Deep orange (70)
    incredible: '#e65100', // Red-orange (75)
    perfect: '#d32f2f',   // Red (80)
    master: '#b71c1c',    // Deep red (85)
    legendary: '#880e4f', // Burgundy (90)
    godlike: '#4a148c',   // Dark red (95)
    ultimate: '#311b92',  // Deep purple-red (100)
  },
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
    semiBold: '600' as const,
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