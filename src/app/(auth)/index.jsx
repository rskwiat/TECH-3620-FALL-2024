import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Link } from 'expo-router';
import { useTheme, Text, Button } from 'react-native-paper';
import LoginForm from '../../components/forms/login';

export default function App() {
  const theme = useTheme();

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

      <View style={styles.butttonWrapper}>
        <Button
          mode="contained"
          style={styles.registerButton}
        >
          <Link href='/register'>
            <Text
              style={{
                color: theme.colors.onSecondary
              }}
            >Register</Text>
          </Link>
        </Button>
        <Button style={{ marginTop: 20 }}>
          <Link href='/forgot-password'>
            <Text
              style={{
                color: theme.colors.onBackground
              }}
            >Forgot Password</Text>
          </Link>
        </Button>
      </View>
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
