import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/auth';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function Index() {
  const { isInitialized, isLoggedIn } = useAuth();

  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 3000); // Adjust the timeout as needed
  }, []);

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';
    if (!inAuthGroup && !isLoggedIn) {
      // eslint-disable-next-line no-console
      console.log('Redirecting to auth...');
      router.replace('/(auth)');
    } else if (isLoggedIn) {
      // eslint-disable-next-line no-console
      console.log('Redirecting to social...');
      router.replace('/(social)');
    }

  }, [segments, navigationState?.key, isInitialized]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!navigationState?.key ? <ActivityIndicator /> : <></>}
    </View>
  );
}
