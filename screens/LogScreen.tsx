import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';



export default function LogScreen({ navigation }: any) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740' }} />
      <Text style={styles.title}>Log an Emotion</Text>
      <Text style={styles.subtitle}>How you feel right now ?</Text>
      <Text style={styles.date}>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</Text>
      <Text style={styles.time}>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PredictedEmotion')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
