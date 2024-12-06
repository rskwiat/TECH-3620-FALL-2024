import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme, Text } from 'react-native-paper';


export default function UserProfile() {
  const theme = useTheme();
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
