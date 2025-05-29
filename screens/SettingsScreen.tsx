import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Avatar, Divider } from 'react-native-paper';
import DeviceStatusScreen from './DeviceStatusScreen';      
import { useAuth } from '../contexts/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, spacing, typography, commonStyles } from '../theme';

const SettingsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const { signOut } = useAuth();
  const handleConnectDevice = () => {
    setModalVisible(true);
  };

  const handleLogout = () => {
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
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar.Image 
            size={80} 
            source={require('../assets/grateful_mindly.png')} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Hello Thuan</Text>
            <Text style={styles.profileEmail}>ntthuan@senior.dev</Text>
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
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#d1d5db", true: "#c7d2fe" }}
            thumbColor={notificationsEnabled ? "#6366f1" : "#f4f3f4"}
          />
        </View>
        
        <Divider />
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="moon-outline" size={24} color="#6366f1" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: "#d1d5db", true: "#c7d2fe" }}
            thumbColor={darkModeEnabled ? "#6366f1" : "#f4f3f4"}
          />
        </View>
        
        <Divider />
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="bluetooth-outline" size={24} color="#6366f1" />
            <Text style={styles.settingText}>Connect Device</Text>
          </View>
          <TouchableOpacity onPress={handleConnectDevice}>
            <Text style={styles.settingText}>Go</Text>
          </TouchableOpacity>
        </View>

        <Divider />

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="share-outline" size={24} color="#6366f1" />
            <Text style={styles.settingText}>Data Sharing</Text>
          </View>
          {/* <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
            trackColor={{ false: "#d1d5db", true: "#c7d2fe" }}
            thumbColor={dataSharing ? "#6366f1" : "#f4f3f4"}
          /> */}
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuInfo}>
            <Ionicons name="lock-closed-outline" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <Divider />
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuInfo}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Privacy Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <Divider />
        
        <TouchableOpacity style={styles.menuItem}>
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

      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <DeviceStatusScreen />
        <TouchableOpacity
          style={styles.closeModalButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeModalText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

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