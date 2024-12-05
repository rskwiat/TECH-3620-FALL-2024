import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../context/auth';

export default function Layout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Stack
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='index' options={{ title: 'Start' }} />
          <Stack.Screen name='register'
            options={{
              presentation: 'modal'
            }}
          />
          <Stack.Screen name='forgot-password' />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  )
};
