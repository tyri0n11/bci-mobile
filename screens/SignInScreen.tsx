import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, TextInput, Animated, Easing } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
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
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const formSlide = useRef(new Animated.Value(50)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const emailInputScale = useRef(new Animated.Value(1)).current;
  const passwordInputScale = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const socialButtonsSlide = useRef(new Animated.Value(50)).current;
  const socialButtonsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(formSlide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Delayed social buttons animation
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(socialButtonsSlide, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(socialButtonsOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);
  }, []);

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

  const animateInput = (inputScale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(inputScale, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      enableOnAndroid
      enableAutomaticScroll
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centerContent}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
            <Animated.View 
              style={[
                styles.form,
                {
                  transform: [{ translateY: formSlide }],
                  opacity: formOpacity,
                }
              ]}
            >
              <View style={styles.formHeader}>
                <Text style={styles.formHeaderText}>Sign in</Text>
              </View>
              <Text style={styles.inputLabel}>Email</Text>
              <Animated.View style={{ transform: [{ scale: emailInputScale }] }}>
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
                  onFocus={() => {
                    animateInput(emailInputScale);
                    setFieldTouched('email', true);
                  }}
                  onBlur={() => handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </Animated.View>
              {touched.email && errors.email && (
                <Animated.Text 
                  style={[styles.errorText, { opacity: formOpacity }]}
                >
                  {errors.email}
                </Animated.Text>
              )}

              <Text style={styles.inputLabel}>Password</Text>
              <Animated.View style={{ transform: [{ scale: passwordInputScale }] }}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      touched.password && errors.password && styles.inputError,
                      touched.password && !errors.password && styles.inputFocused,
                    ]}
                    placeholder="Password"
                    placeholderTextColor={colors.text.secondary}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onFocus={() => {
                      animateInput(passwordInputScale);
                      setFieldTouched('password', true);
                    }}
                    onBlur={() => handleBlur('password')}
                    secureTextEntry={!showPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={24}
                      color={colors.text.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
              {touched.password && errors.password && (
                <Animated.Text 
                  style={[styles.errorText, { opacity: formOpacity }]}
                >
                  {errors.password}
                </Animated.Text>
              )}

              <View style={styles.rememberRow}>
                <CheckBox
                  checked={rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                  label="Remember me"
                />
              </View>

              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Button
                  title="Sign in"
                  onPress={() => {
                    animateButton();
                    handleSubmit();
                  }}
                  style={styles.signInButton}
                  textStyle={styles.signInButtonText}
                  loading={loading}
                  disabled={loading}
                />
              </Animated.View>

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPassword')}
                disabled={loading}
              >
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.divider} />
              </View>

              <Animated.View 
                style={[
                  styles.socialButtonsContainer,
                  {
                    transform: [{ translateY: socialButtonsSlide }],
                    opacity: socialButtonsOpacity,
                  }
                ]}
              >
                <Button
                  title="Sign in with Google"
                  onPress={() => { }}
                  style={styles.socialButton}
                  textStyle={styles.socialButtonText}
                  disabled={loading}
                  icon={<Ionicons name="logo-google" size={24} color={colors.primary} style={styles.socialIcon} />}
                />
                <Button
                  title="Sign in with Facebook"
                  onPress={() => { }}
                  style={styles.socialButton}
                  textStyle={styles.socialButtonText}
                  disabled={loading}
                  icon={<Ionicons name="logo-facebook" size={24} color={colors.primary} style={styles.socialIcon} />}
                />
              </Animated.View>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  disabled={loading}
                >
                  <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
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
    paddingTop: 0,
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
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  formHeader: {
    marginBottom: spacing.lg,
  },
  formHeaderText: {
    fontSize: typography.sizes.xxlarge,
    color: colors.primary,
    fontWeight: typography.weights.bold,
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
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#ef4444',
    shadowColor: '#ef4444',
    shadowOpacity: 0.2,
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
    backgroundColor: colors.secondary,
    borderRadius: 8,
    marginBottom: spacing.md,
    height: 48,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  socialButtonsContainer: {
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40, // just enough for the icon
  },
  passwordToggle: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 12,
  },
  socialIcon: {
    marginRight: 8,
  },
});

export default SignInScreen; 