import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/shared/Header';
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
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="LogEmotion" component={LogScreen} />
      <Stack.Screen name="PredictedEmotion" component={PredictedEmotionScreen} />
      <Stack.Screen name="DescribeFeeling" component={DescribeFeelingScreen} />
      <Stack.Screen name="Impact" component={ImpactScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: true,
        header: () => <Header />
      }}
    >
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
        header: () => <Header />
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MainScreen} 
        options={{ title: '' }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ title: '' }}
      />
      <Tab.Screen 
        name="Log" 
        component={LogStack} 
        options={{ title: '' }} 
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationScreen} 
        options={{ title: '' }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: '' }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { session } = useAuth();

  return (
    <NavigationContainer>
      {session ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <AppContent />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}