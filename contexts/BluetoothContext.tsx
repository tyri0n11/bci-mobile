import React, { createContext, useContext, useState, ReactNode } from 'react';

type ConnectionStatus = 'disconnected' | 'scanning' | 'selecting' | 'connecting' | 'connected';

interface Device {
  id: string;
  name: string;
}

interface BluetoothContextType {
  connectionStatus: ConnectionStatus;
  selectedDevice: Device | null;
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  startScan: () => void;
  selectDevice: (device: Device) => void;
  disconnect: () => void;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

export function BluetoothProvider({ children }: { children: ReactNode }) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const startScan = () => {
    setConnectionStatus('scanning');
    // Simulate scanning delay
    setTimeout(() => {
      setConnectionStatus('selecting');
    }, 2000);
  };

  const selectDevice = (device: Device) => {
    setSelectedDevice(device);
    setConnectionStatus('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setConnectionStatus('connected');
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }, 2000);
  };

  const disconnect = () => {
    setConnectionStatus('disconnected');
    setSelectedDevice(null);
  };

  const value = {
    connectionStatus,
    selectedDevice,
    isModalVisible,
    setModalVisible,
    startScan,
    selectDevice,
    disconnect,
  };

  return (
    <BluetoothContext.Provider value={value}>
      {children}
    </BluetoothContext.Provider>
  );
}

export function useBluetooth() {
  const context = useContext(BluetoothContext);
  if (context === undefined) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  return context;
} 