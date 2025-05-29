import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BluetoothProvider } from './contexts/BluetoothContext';
import { EmotionProvider } from './contexts/EmotionContext';
import Header from './components/shared/Header';
import { KeyboardAvoidingView, Platform } from 'react-native';
import CustomTabBar from './components/shared/CustomTabBar';

// Screens
import MainScreen from './screens/MainScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import EmotionLogScreen from './screens/EmotionLogScreen';
import NotificationScreen from './screens/NotificationScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { MoodProvider } from './contexts/MoodContext';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogStack() {
  return (
    <EmotionProvider>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false, 
          animation: 'slide_from_right',
          gestureEnabled: false // Disable swipe back gesture
        }}
      >
        <Stack.Screen 
          name="LogEmotion" 
          component={EmotionLogScreen}
          options={{
            animation: 'none' // Disable animation for LogScreen
          }}
        />
      </Stack.Navigator>
    </EmotionProvider>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
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
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
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
        options={{ 
          title: '',
          lazy: false // This ensures LogStack is always mounted
        }} 
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
    <SafeAreaProvider>
      <AuthProvider>
        <MoodProvider>
        <BluetoothProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
            style={{ flex: 1 }}
          >
            <AppContent />
          </KeyboardAvoidingView>
        </BluetoothProvider>
        </MoodProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}