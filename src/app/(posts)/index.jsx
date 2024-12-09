import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import CreatePost from '../../components/forms/createPost';

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>
      <Text
        variant='headlineSmall'
        style={{
          ...styles.headline,
          color: theme.colors.onBackground,
        }}>Create a post
      </Text>
      <CreatePost />
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
  headline: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 5
  },
  butttonWrapper: {
    marginTop: 'auto',
    marginHorizontal: 20,
    marginBottom: 40
  }
});
