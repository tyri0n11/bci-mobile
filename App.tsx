import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './utils/supabaseClient';
// Screens
import MainScreen from './screens/MainScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import LogScreen from './screens/LogScreen';
import PredictedEmotionScreen from './screens/PredictedEmotionScreen';
import NotificationScreen from './screens/NotificationScreen';
import DescribeFeelingScreen from './screens/DescribeFeelingScreen';
import ImpactScreen from './screens/ImpactScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Log" component={LogScreen} />
      <Stack.Screen name="PredictedEmotion" component={PredictedEmotionScreen} />
      <Stack.Screen name="DescribeFeeling" component={DescribeFeelingScreen} />
      <Stack.Screen name="Impact" component={ImpactScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Log') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MainScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ title: 'Direct' }}
      />
      <Tab.Screen 
        name="Log" 
        component={LogStack} 
        options={{ title: 'Record' }} 
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationScreen} 
        options={{ title: 'Notifications' }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  // TODO: Add authentication state management
  const isAuthenticated = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <MainTabs /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}