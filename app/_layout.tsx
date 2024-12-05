import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/context/auth';
import { PaperProvider } from 'react-native-paper';
import CustomNavigationBar from '@/components/navigation/CustomNavBar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            initialRouteName='(tabs)'
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />
            }}>
            <Stack.Screen name='(tabs)' options={{ title: 'Posts' }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
