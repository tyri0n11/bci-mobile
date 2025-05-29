import React, { useState, useCallback, Suspense } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Switch, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Avatar, Divider } from 'react-native-paper';
import DeviceStatusScreen from './DeviceStatusScreen';      
import { useAuth } from '../contexts/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, spacing, typography } from '../theme';
import { ChangePasswordModal, PrivacyPoliciesModal, HelpSupportModal } from '../components/modals';

// Fallback component for Suspense
const ModalFallback = () => (
  <View style={fallbackStyles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
    <Text style={fallbackStyles.text}>Loading...</Text>
  </View>
);

const fallbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: colors.white,
    fontSize: typography.sizes.medium,
    marginTop: spacing.sm,
  },
});

const SettingsScreen = React.memo(() => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isPoliciesModalVisible, setPoliciesModalVisible] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  
  const { signOut, user } = useAuth();
  
  const handleConnectDevice = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleChangePassword = useCallback(() => {
    setPasswordModalVisible(true);
  }, []);

  const handleShowPolicies = useCallback(() => {
    setPoliciesModalVisible(true);
  }, []);

  const handleShowHelp = useCallback(() => {
    setHelpModalVisible(true);
  }, []);

  const handleCloseDeviceModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleClosePasswordModal = useCallback(() => {
    setPasswordModalVisible(false);
  }, []);

  const handleClosePoliciesModal = useCallback(() => {
    setPoliciesModalVisible(false);
  }, []);

  const handleCloseHelpModal = useCallback(() => {
    setHelpModalVisible(false);
  }, []);

  const handleNotificationToggle = useCallback((value: boolean) => {
    setNotificationsEnabled(value);
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => signOut(),
          style: "destructive"
        }
      ]
    );
  }, [signOut]);

  return (
    <KeyboardAwareScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar.Image 
            size={80} 
            source={require('../assets/very_pleasant_mindly.png')} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.user_metadata.name || 'Mindly'}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </Card>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications-outline" size={24} color="#6366f1" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: "#d1d5db", true: "#c7d2fe" }}
            thumbColor={notificationsEnabled ? "#6366f1" : "#f4f3f4"}
          />
        </View>
        
        <Divider />

      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={handleChangePassword}>
          <View style={styles.menuInfo}>
            <Ionicons name="lock-closed-outline" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <Divider />
        
        <TouchableOpacity style={styles.menuItem} onPress={handleShowPolicies}>
          <View style={styles.menuInfo}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Privacy & Policies</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <Divider />
        
        <TouchableOpacity style={styles.menuItem} onPress={handleShowHelp}>
          <View style={styles.menuInfo}>
            <Ionicons name="help-circle-outline" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>

      {/* Device Connection Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleCloseDeviceModal}
      >
        <DeviceStatusScreen />
        <TouchableOpacity
          style={styles.closeModalButton}
          onPress={handleCloseDeviceModal}
        >
          <Text style={styles.closeModalText}>Close</Text>
        </TouchableOpacity>
      </Modal>

      {/* Modular Modal Components */}
      <Suspense fallback={<ModalFallback />}>
        <ChangePasswordModal
          visible={isPasswordModalVisible}
          onClose={handleClosePasswordModal}
        />
      </Suspense>

      <Suspense fallback={<ModalFallback />}>
        <PrivacyPoliciesModal
          visible={isPoliciesModalVisible}
          onClose={handleClosePoliciesModal}
        />
      </Suspense>

      <Suspense fallback={<ModalFallback />}>
        <HelpSupportModal
          visible={isHelpModalVisible}
          onClose={handleCloseHelpModal}
        />
      </Suspense>
    </KeyboardAwareScrollView>
  );
});

SettingsScreen.displayName = 'SettingsScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  profileCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: spacing.md,
  },
  profileName: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  profileEmail: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  editProfileButton: {
    backgroundColor: colors.secondary,
    padding: spacing.sm,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  editProfileText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  settingsSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    padding: spacing.md,
    backgroundColor: colors.secondary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: typography.sizes.medium,
    marginLeft: spacing.md,
    color: colors.text.primary,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  menuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: typography.sizes.medium,
    marginLeft: spacing.md,
    color: colors.text.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
    marginLeft: spacing.sm,
  },
  versionText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.sizes.small,
    marginBottom: spacing.md,
  },
  closeModalButton: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeModalText: {
    color: colors.white,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
  },
});

export default SettingsScreen;