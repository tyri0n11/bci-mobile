import React, { useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface HelpSupportModalProps {
  visible: boolean;
  onClose: () => void;
}

const HelpSupportModal: React.FC<HelpSupportModalProps> = React.memo(({ visible, onClose }) => {
  const handleEmailPress = useCallback(() => {
    Linking.openURL('mailto:support@bci-mobile.com').catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  }, []);

  const handleWebsitePress = useCallback(() => {
    Linking.openURL('https://www.bci-mobile.com/support').catch(() => {
      Alert.alert('Error', 'Unable to open website');
    });
  }, []);

  const handlePhonePress = useCallback(() => {
    Linking.openURL('tel:+1-800-BCI-HELP').catch(() => {
      Alert.alert('Error', 'Unable to make phone call');
    });
  }, []);

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
            <Text style={styles.modalTitle}>Help & Support</Text>
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
            {/* FAQ Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
              
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>How do I connect my BCI device?</Text>
                <Text style={styles.faqAnswer}>
                  Go to Settings → Connect Device. Make sure your BCI device is in pairing mode and follow the on-screen instructions to connect via Bluetooth.
                </Text>
              </View>

              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>Why is my mood data not syncing?</Text>
                <Text style={styles.faqAnswer}>
                  Check your internet connection and ensure you're logged in. If the problem persists, try logging out and back in, or contact support.
                </Text>
              </View>

              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>How accurate is the mood tracking?</Text>
                <Text style={styles.faqAnswer}>
                  Our BCI technology provides scientifically-backed mood analysis, but results may vary. It's designed to complement, not replace, professional mental health care.
                </Text>
              </View>

              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>Can I export my data?</Text>
                <Text style={styles.faqAnswer}>
                  Data export functionality is coming soon. You'll be able to export your mood history and insights in CSV format.
                </Text>
              </View>
            </View>

            {/* Troubleshooting Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Troubleshooting</Text>
              
              <View style={styles.troubleshootItem}>
                <View style={styles.troubleshootHeader}>
                  <Ionicons name="wifi-outline" size={20} color={colors.primary} />
                  <Text style={styles.troubleshootTitle}>Connection Issues</Text>
                </View>
                <Text style={styles.troubleshootText}>
                  • Ensure Bluetooth is enabled{'\n'}
                  • Keep device within 10 feet of BCI hardware{'\n'}
                  • Restart the app if connection fails{'\n'}
                  • Check device battery levels
                </Text>
              </View>

              <View style={styles.troubleshootItem}>
                <View style={styles.troubleshootHeader}>
                  <Ionicons name="sync-outline" size={20} color={colors.primary} />
                  <Text style={styles.troubleshootTitle}>Data Sync Problems</Text>
                </View>
                <Text style={styles.troubleshootText}>
                  • Check internet connection{'\n'}
                  • Verify account login status{'\n'}
                  • Force close and reopen app{'\n'}
                  • Clear app cache in device settings
                </Text>
              </View>

              <View style={styles.troubleshootItem}>
                <View style={styles.troubleshootHeader}>
                  <Ionicons name="battery-dead-outline" size={20} color={colors.primary} />
                  <Text style={styles.troubleshootTitle}>Performance Issues</Text>
                </View>
                <Text style={styles.troubleshootText}>
                  • Close other apps to free memory{'\n'}
                  • Restart your device{'\n'}
                  • Update to latest app version{'\n'}
                  • Ensure sufficient storage space
                </Text>
              </View>
            </View>

            {/* Contact Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Support</Text>
              <Text style={styles.contactDescription}>
                Can't find what you're looking for? Our support team is here to help!
              </Text>

              <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
                <View style={styles.contactIconContainer}>
                  <Ionicons name="mail-outline" size={24} color={colors.primary} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Email Support</Text>
                  <Text style={styles.contactValue}>support@bci-mobile.com</Text>
                  <Text style={styles.contactNote}>Response within 24 hours</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
                <View style={styles.contactIconContainer}>
                  <Ionicons name="call-outline" size={24} color={colors.primary} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Phone Support</Text>
                  <Text style={styles.contactValue}>+1-800-BCI-HELP</Text>
                  <Text style={styles.contactNote}>Mon-Fri 9AM-6PM EST</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
                <View style={styles.contactIconContainer}>
                  <Ionicons name="globe-outline" size={24} color={colors.primary} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Help Center</Text>
                  <Text style={styles.contactValue}>www.bci-mobile.com/support</Text>
                  <Text style={styles.contactNote}>Browse knowledge base</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* App Info Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>App Information</Text>
              <View style={styles.appInfoRow}>
                <Text style={styles.appInfoLabel}>Version:</Text>
                <Text style={styles.appInfoValue}>1.0.0</Text>
              </View>
              <View style={styles.appInfoRow}>
                <Text style={styles.appInfoLabel}>Build:</Text>
                <Text style={styles.appInfoValue}>2024.01.15</Text>
              </View>
              <View style={styles.appInfoRow}>
                <Text style={styles.appInfoLabel}>Platform:</Text>
                <Text style={styles.appInfoValue}>React Native</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

HelpSupportModal.displayName = 'HelpSupportModal';

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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  // FAQ Styles
  faqItem: {
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  faqQuestion: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  faqAnswer: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  // Troubleshooting Styles
  troubleshootItem: {
    marginBottom: spacing.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  troubleshootHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  troubleshootTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semiBold,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  troubleshootText: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  // Contact Styles
  contactDescription: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semiBold,
    color: colors.text.primary,
  },
  contactValue: {
    fontSize: typography.sizes.small,
    color: colors.primary,
    marginTop: 2,
  },
  contactNote: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    marginTop: 2,
  },
  // App Info Styles
  appInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appInfoLabel: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
  },
  appInfoValue: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semiBold,
    color: colors.text.primary,
  },
});

export default HelpSupportModal; 