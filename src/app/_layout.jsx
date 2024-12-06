import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../context/auth';
import { PocketBaseProvider } from '../context/pocketbase';

export default function Layout() {
  return (
    <PaperProvider>
      <PocketBaseProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(social)" />
            <Stack.Screen name="(posts)/index" options={{ presentation: 'modal' }} />
            <Stack.Screen name='(profile)' />
          </Stack>
        </AuthProvider>
      </PocketBaseProvider>
    </PaperProvider>
  );
};
