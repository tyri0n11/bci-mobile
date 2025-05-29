import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { useBluetooth } from '../../contexts/BluetoothContext';

// Dummy devices for demonstration
const dummyDevices = [
  { id: '1', name: 'Mindly Device 1' },
  { id: '2', name: 'Mindly Device 2' },
  { id: '3', name: 'Mindly Device 3' },
];

export default function Header() {
  const {
    connectionStatus,
    isModalVisible,
    setModalVisible,
    startScan,
    selectDevice,
  } = useBluetooth();

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return colors.primary;
      case 'scanning':
      case 'connecting':
        return colors.text.secondary;
      default:
        return colors.text.light;
    }
  };

  const renderModalContent = () => {
    switch (connectionStatus) {
      case 'disconnected':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Connect Device</Text>
            <Text style={styles.modalSubtitle}>Start scanning for nearby devices</Text>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={startScan}
            >
              <Text style={styles.scanButtonText}>Start Scan</Text>
            </TouchableOpacity>
          </View>
        );
      case 'scanning':
        return (
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.modalSubtitle}>Scanning for devices...</Text>
          </View>
        );
      case 'selecting':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Device</Text>
            {dummyDevices.map((device) => (
              <TouchableOpacity
                key={device.id}
                style={styles.deviceItem}
                onPress={() => selectDevice(device)}
              >
                <Ionicons name="bluetooth" size={24} color={colors.primary} />
                <Text style={styles.deviceName}>{device.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'connecting':
        return (
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.modalSubtitle}>Connecting to device...</Text>
          </View>
        );
      case 'connected':
        return (
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={48} color={colors.primary} />
            <Text style={styles.modalSubtitle}>Successfully connected!</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Mindly</Text>
        <TouchableOpacity 
          style={styles.connectButton}
          onPress={() => {
            setModalVisible(true);
            if (connectionStatus === 'disconnected') {
              startScan();
            }
          }}
        >
          <Ionicons 
            name="bluetooth" 
            size={24} 
            color={getStatusColor()} 
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {renderModalContent()}
            {connectionStatus !== 'connecting' && connectionStatus !== 'scanning' && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
  },
  header: {
    height: 60,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  connectButton: {
    padding: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    width: '80%',
    maxWidth: 400,
  },
  modalContent: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  modalSubtitle: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.md,
  },
  scanButtonText: {
    color: colors.white,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: '100%',
  },
  deviceName: {
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  closeButton: {
    marginTop: spacing.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
  },
}); 