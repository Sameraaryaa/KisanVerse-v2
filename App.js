import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import TranslationService from './src/services/TranslationService';

// Onboarding Screens
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';

// Main Screens
import HomeScreen from './src/screens/HomeScreen';
import FarmScreen from './src/screens/FarmScreen';
import MarketScreen from './src/screens/MarketScreen';
import CooperativeScreen from './src/screens/CooperativeScreen';
import SchemeMitraScreen from './src/screens/SchemeMitraScreen';
import CropDoctorScreen from './src/screens/CropDoctorScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import LogisticsScreen from './src/screens/LogisticsScreen';

import RewardsScreen from './src/screens/RewardsScreen';
import DigitalLockerScreen from './src/screens/DigitalLockerScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState('language');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const completed = await AsyncStorage.getItem('onboarding_complete');
      const savedUserData = await AsyncStorage.getItem('user_data');

      if (completed === 'true' && savedUserData) {
        const data = JSON.parse(savedUserData);
        // Set the language in translation service
        TranslationService.setLanguage(data.language || 'en');
        setOnboardingComplete(true);
      }
    } catch (error) {
      console.log('Error checking onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageComplete = async (data) => {
    // Set language immediately
    TranslationService.setLanguage(data.language);
    setUserData(prev => ({ ...prev, ...data }));
    setCurrentStep('profile');
  };

  const handleProfileComplete = async (data) => {
    try {
      const finalData = { ...userData, ...data };
      await AsyncStorage.setItem('user_data', JSON.stringify(finalData));
      await AsyncStorage.setItem('onboarding_complete', 'true');
      setOnboardingComplete(true);
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0fdf4' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (!onboardingComplete) {
    return (
      <>
        <StatusBar style="dark" />
        {currentStep === 'language' ? (
          <LanguageSelectionScreen onComplete={handleLanguageComplete} />
        ) : (
          <ProfileSetupScreen onComplete={handleProfileComplete} />
        )}
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f0fdf4' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Farm" component={FarmScreen} />
        <Stack.Screen name="Market" component={MarketScreen} />
        <Stack.Screen name="Cooperative" component={CooperativeScreen} />
        <Stack.Screen name="SchemeMitra" component={SchemeMitraScreen} />
        <Stack.Screen name="CropDoctor" component={CropDoctorScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Logistics" component={LogisticsScreen} />
        <Stack.Screen name="Rewards" component={RewardsScreen} />
        <Stack.Screen name="DigitalLocker" component={DigitalLockerScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
