import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeviceStatusScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DEVICE STATUS</Text>
      <Text style={styles.status}>Connected</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeviceStatusScreen;