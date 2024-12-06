import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Link, useRootNavigationState, useSegments, useLocalSearchParams, Stack } from 'expo-router';
import { useTheme, Text, Button } from 'react-native-paper';
import LoginForm from '../../components/forms/login';
import { useAuth } from '../../context/auth';
import { useRouter, Redirect } from 'expo-router';


export default function UserProfile() {
  const theme = useTheme();
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { user, isLoggedIn, isInitialized } = useAuth();
  const params = useLocalSearchParams();


  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>
      <Stack.Screen options={{ title: params.index }} />
      <Text
        variant='bodyMedium'
        style={{
          color: theme.colors.onBackground,
        }}>User Id Page for - {params.index}
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  regsiterButton: {
    marginHorizontal: 40
  },
  wrapper: {
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 20,
  },
  butttonWrapper: {
    marginTop: 'auto',
    marginHorizontal: 20,
    marginBottom: 40
  }
});
