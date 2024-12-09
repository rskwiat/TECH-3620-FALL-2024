import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import CreateAccount from '../../components/forms/createAccount';

export default function Register() {
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
        }}>Register for an Account:
      </Text>
      <CreateAccount />
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
