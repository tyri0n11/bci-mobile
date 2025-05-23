import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import Button from '../components/shared/Button';
import { colors, spacing, typography } from '../theme';
import { useAuth } from '../contexts/AuthContext';

const SignUpScreen = ({ navigation }: any) => {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const { error } = await signUp(email, password, name);
        if (error) {
          Alert.alert('Error', error.message);
        } else {
          Alert.alert(
            'Success',
            'Please check your email to confirm your account.',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('SignIn'),
              },
            ]
          );
        }
      } catch (error: any) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
      <ScrollView style={styles.scrollContent} >
        <View style={styles.centerContent}>
          <View style={styles.header}>
            <Text style={styles.sitemark}>Mindly</Text>
            <Text style={styles.signUpTitle}>Sign up</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                errors.name && styles.inputError,
                nameFocused && styles.inputFocused,
              ]}
              placeholder="Your name"
              placeholderTextColor={colors.text.secondary}
              value={name}
              onChangeText={setName}
              editable={!loading}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[
                styles.input,
                errors.email && styles.inputError,
                emailFocused && styles.inputFocused,
              ]}
              placeholder="your@email.com"
              placeholderTextColor={colors.text.secondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[
                styles.input,
                errors.password && styles.inputError,
                passwordFocused && styles.inputFocused,
              ]}
              placeholder="Password"
              placeholderTextColor={colors.text.secondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword && styles.inputError,
                confirmPasswordFocused && styles.inputFocused,
              ]}
              placeholder="Confirm Password"
              placeholderTextColor={colors.text.secondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              style={styles.signUpButton}
              textStyle={styles.signUpButtonText}
              loading={loading}
              disabled={loading}
            />
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('SignIn')}
                disabled={loading}
              >
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sitemark: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  signUpTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
    backgroundColor: colors.background,
    marginBottom: spacing.md,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  inputLabel: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    marginBottom: 4,
    marginLeft: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: typography.sizes.small,
    marginBottom: spacing.sm,
    marginLeft: 2,
  },
  signUpButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: spacing.md,
    height: 48,
  },
  signUpButtonText: {
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.medium,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  signInText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.medium,
  },
  signInLink: {
    color: colors.primary,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen; 