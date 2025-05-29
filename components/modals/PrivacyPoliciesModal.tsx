import React, { useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface PrivacyPoliciesModalProps {
  visible: boolean;
  onClose: () => void;
}

const PrivacyPoliciesModal: React.FC<PrivacyPoliciesModalProps> = React.memo(({ visible, onClose }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Don't render modal content if not visible to save memory
  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Privacy & Policies</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
          >
            <View style={styles.policySection}>
              <Text style={styles.policySectionTitle}>Privacy Policy</Text>
              <Text style={styles.policyText}>
                BCI Mobile respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you use our app and tell you about your privacy rights.
              </Text>
              
              <Text style={styles.policySubtitle}>Data Collection</Text>
              <Text style={styles.policyText}>
                • EEG and biometric data from connected BCI devices{'\n'}
                • Mood scores and emotional state logs{'\n'}
                • User account information (email, profile data){'\n'}
                • App usage analytics and performance data
              </Text>
              
              <Text style={styles.policySubtitle}>Data Usage</Text>
              <Text style={styles.policyText}>
                Your data is used to provide personalized mood insights, improve app functionality, and research mental health patterns. We never sell your personal data to third parties.
              </Text>
              
              <Text style={styles.policySubtitle}>Data Security</Text>
              <Text style={styles.policyText}>
                All data is encrypted in transit and at rest. We use industry-standard security measures including SSL encryption and secure cloud storage.
              </Text>
            </View>

            <View style={styles.policySection}>
              <Text style={styles.policySectionTitle}>Terms of Service</Text>
              <Text style={styles.policyText}>
                By using BCI Mobile, you agree to these terms of service. Please read them carefully.
              </Text>
              
              <Text style={styles.policySubtitle}>Acceptable Use</Text>
              <Text style={styles.policyText}>
                • Use the app for personal mental health monitoring only{'\n'}
                • Do not attempt to reverse engineer or hack the app{'\n'}
                • Respect other users and maintain appropriate conduct{'\n'}
                • Follow all applicable laws and regulations
              </Text>
              
              <Text style={styles.policySubtitle}>Medical Disclaimer</Text>
              <Text style={styles.policyText}>
                BCI Mobile is not a medical device and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers.
              </Text>
              
              <Text style={styles.policySubtitle}>Limitation of Liability</Text>
              <Text style={styles.policyText}>
                The app is provided "as is" without warranties. We are not liable for any damages arising from the use of this application.
              </Text>
            </View>

            <View style={styles.policySection}>
              <Text style={styles.policySectionTitle}>Contact Information</Text>
              <Text style={styles.policyText}>
                For questions about these policies or your data, contact us at:{'\n\n'}
                Email: privacy@bci-mobile.com{'\n'}
                Website: www.bci-mobile.com{'\n\n'}
                Last updated: {new Date().toLocaleDateString()}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

PrivacyPoliciesModal.displayName = 'PrivacyPoliciesModal';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: spacing.md,
    maxHeight: '90%',
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  modalContent: {
    padding: spacing.md,
  },
  policySection: {
    marginBottom: spacing.lg,
  },
  policySectionTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  policySubtitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semiBold,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  policyText: {
    fontSize: typography.sizes.small,
    color: colors.text.primary,
    lineHeight: 20,
    textAlign: 'justify',
  },
});

export default PrivacyPoliciesModal; 