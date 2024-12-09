import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import ResetPassword from '../../components/forms/forgotPassword';

export default function ForgotPassword() {
  const theme = useTheme();

  return (
    <View style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>
      <Text
        variant='headlineSmall'
        style={{
          ...styles.headline,
          color: theme.colors.onBackground,
        }}>Forgot Password?
      </Text>
      <ResetPassword />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    marginTop: 20,
    paddingHorizontal: 18
  }
});
