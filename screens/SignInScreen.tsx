import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../components/shared/Button';
import CheckBox from '../components/shared/CheckBox';
import { colors, spacing, typography } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInScreen = ({ navigation }: any) => {
  const { signIn } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { error } = await signIn(values.email, values.password);
      if (error) {
        Alert.alert('Error', error.message);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'bci-mobile://reset-password',
      });
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Password Reset',
          'If an account exists with this email, you will receive a password reset link.'
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      enableOnAndroid
      enableAutomaticScroll
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centerContent}>
        <View style={styles.header}>
          <Text style={styles.signInTitle}>Sign in</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
            <View style={styles.form}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError,
                  touched.email && !errors.email && styles.inputFocused,
                ]}
                placeholder="your@email.com"
                placeholderTextColor={colors.text.secondary}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => {
                  handleBlur('email');
                  setFieldTouched('email', true);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password && styles.inputError,
                  touched.password && !errors.password && styles.inputFocused,
                ]}
                placeholder="Password"
                placeholderTextColor={colors.text.secondary}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => {
                  handleBlur('password');
                  setFieldTouched('password', true);
                }}
                secureTextEntry
                editable={!loading}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.rememberRow}>
                <CheckBox
                  checked={rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                  label="Remember me"
                  disabled={loading}
                />
              </View>

              <Button
                title="Sign in"
                onPress={() => handleSubmit()}
                style={styles.signInButton}
                textStyle={styles.signInButtonText}
                loading={loading}
                disabled={loading}
              />

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => handleForgotPassword(values.email)}
                disabled={loading}
              >
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.divider} />
              </View>

              <Button
                title="Sign in with Google"
                onPress={() => { }}
                style={styles.socialButton}
                textStyle={styles.socialButtonText}
                disabled={loading}
              />
              <Button
                title="Sign in with Facebook"
                onPress={() => { }}
                style={styles.socialButton}
                textStyle={styles.socialButtonText}
                disabled={loading}
              />

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  disabled={loading}
                >
                  <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
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
  },
  sitemark: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  signInTitle: {
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
  errorText: {
    color: '#ef4444',
    fontSize: typography.sizes.small,
    marginBottom: spacing.sm,
    marginLeft: 2,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  signInButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: spacing.md,
    height: 48,
  },
  signInButtonText: {
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.medium,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.sizes.medium,
    textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    marginHorizontal: spacing.md,
    color: colors.text.secondary,
    fontSize: typography.sizes.medium,
  },
  socialButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  socialButtonText: {
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.medium,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  signUpText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.medium,
  },
  signUpLink: {
    color: colors.primary,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
    textDecorationLine: 'underline',
  },
  inputLabel: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    marginBottom: 4,
    marginLeft: 2,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default SignInScreen; 