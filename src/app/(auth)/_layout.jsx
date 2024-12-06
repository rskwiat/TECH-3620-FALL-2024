import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='index' options={{ title: 'Start' }} />
      <Stack.Screen name='register'
        options={{
          presentation: 'modal'
        }}
      />
      <Stack.Screen name='forgot-password'
        options={{
          presentation: 'modal'
        }}
      />
    </Stack>
  )
};
