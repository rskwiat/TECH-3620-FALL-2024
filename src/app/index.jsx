import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/auth';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { isInitialized, isLoggedIn } = useAuth();

  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

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
