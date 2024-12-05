import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Link } from 'expo-router';
import { useTheme, Text, Button } from 'react-native-paper';
import { useAuth } from '../../context/auth';

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
          }}>Logged in</Text>
      </View>

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
  },
  butttonWrapper: {
    marginTop: 'auto',
    marginHorizontal: 20,
  }
});
