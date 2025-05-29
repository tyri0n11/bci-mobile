import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const TAB_ICONS = [
  { name: 'home-outline', label: 'Home' },
  { name: 'chatbubble-outline', label: 'Chat' },
  { name: 'add', label: 'Add' }, // FAB
  { name: 'notifications-outline', label: 'Notify' },
  { name: 'settings-outline', label: 'Settings' },
];

export default function CustomTabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const isFab = index === 2;
        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        // Scale animation
        const scale = new Animated.Value(isFocused ? 1.2 : 1);
        React.useEffect(() => {
          Animated.spring(scale, {
            toValue: isFocused ? 1.2 : 1,
            useNativeDriver: true,
          }).start();
        }, [isFocused]);

        if (isFab) {
          // Floating Action Button
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.fabContainer}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6366f1', '#ffb300']}
                style={styles.fab}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="add" size={32} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          );
        }

        // Gradient icon
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              <LinearGradient
                colors={isFocused ? ['#6366f1', '#ffb300'] : ['#bbb', '#bbb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              >
                <Ionicons
                  name={TAB_ICONS[index].name as any}
                  size={28}
                  color="#fff"
                />
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    paddingBottom: 16,
    paddingTop: 8,
    alignItems: 'center',
    width: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGradient: {
    borderRadius: 20,
    padding: 8,
  },
  fabContainer: {
    position: 'relative',
    top: -24,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#6366f1',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
}); 