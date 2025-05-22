import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Avatar, Divider } from 'react-native-paper';
import DeviceStatusScreen from './DeviceStatusScreen';

const SettingsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

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
          onPress: () => console.log("User logged out"),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar.Image 
            size={80} 
            source={{ uri: 'https://randomuser.me/api/portraits/women/17.jpg' }} 
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  profileCard: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  editProfileButton: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  editProfileText: {
    color: '#6366f1',
    fontWeight: 'bold',
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 15,
    backgroundColor: '#f9fafb',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  menuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#9ca3af',
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: '#6366f1',
    padding: 10,
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;