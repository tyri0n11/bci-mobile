// screens/PredictedEmotionScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PredictedEmotionScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
         <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Based on collected data,</Text>
      <Text style={styles.title}>you're feeling</Text>

      <Image
        style={styles.image}
        source={{ uri: 'https://www.mollypotter.com/wp-content/uploads/2022/04/SadFace.jpg' }}
      />

      <Text style={styles.emotion}>Unpleasant</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DescribeFeeling')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    topNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },

container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 30,
  },
  emotion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
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
    fontWeight: 'bold',
    fontSize: 16,
  },
});

