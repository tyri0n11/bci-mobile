import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const feelingsList = [
  'Education', 'Works', 'Health',
  'Partner', 'Dating', 
  'Weather', 'Money', 
  'Family', 'Friend', 'Community', 
  'Tasks' , 'Hobbies', 'Travel',
  'Food', 'Pets', 'Sleep'
];

export default function DescribeImpactScreen({ navigation }: any) {
  const [showMore, setShowMore] = useState(false);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);

  const displayedFeelings = showMore ? feelingsList : feelingsList.slice(0, 10);

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Nav */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>What has the biggest impact?</Text>
      <View style={styles.divider} />

      {/* Feeling Buttons */}
      <View style={styles.feelingsContainer}>
        {displayedFeelings.map((feeling, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleFeeling(feeling)}
            style={[
              styles.feelingButton,
              selectedFeelings.includes(feeling) && styles.feelingButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.feelingText,
                selectedFeelings.includes(feeling) && styles.feelingTextSelected,
              ]}
            >
              {feeling}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Show More */}
      <TouchableOpacity onPress={() => setShowMore(!showMore)}>
        <Text style={styles.showMore}>
          {showMore ? 'Show less ▲' : 'Show more ▼'}
        </Text>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topNav: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#ccc',
    marginBottom: 20,
    width: '100%',
  },
  feelingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  feelingButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 5,
  },
  feelingButtonSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  feelingText: {
    color: '#333',
  },
  feelingTextSelected: {
    color: '#fff',
  },
  showMore: {
    textAlign: 'center',
    color: '#6366f1',
    marginVertical: 20,
    fontWeight: '600',
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
