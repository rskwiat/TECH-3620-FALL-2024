import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Link } from 'expo-router';
import { useTheme, Text } from 'react-native-paper';
import LoginForm from '../components/forms/login';
import { useAuth } from '../context/auth';

export default function App() {
  const theme = useTheme();
  const s = useAuth();

  console.log(s);

  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>
      <View style={styles.wrapper}>
        <Text
          variant='headlineMedium'
          style={{
            color: theme.colors.onBackground,
          }}>Welcome</Text>
        <Text
          variant='bodyMedium'
          style={{
            color: theme.colors.onBackground,
          }}>Sign in to Continue.
        </Text>
      </View>
      <LoginForm />


      {/* <Link href='/register'>
        <Text>Regsiter</Text>
      </Link>


      <Link href='/forgot-password'>
        <Text>Forgot Password</Text>
      </Link> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 20,
  }
});
