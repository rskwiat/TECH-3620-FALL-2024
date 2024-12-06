import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function NotFoundScreen() {
  const theme = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}>
        <Text style={{
          color: theme.colors.onBackground,
        }} type='title'>This screen doesn&apos;t exist.</Text>
        <Link href='/' style={styles.link}>
          <Text style={{
            color: theme.colors.onBackground
          }}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
