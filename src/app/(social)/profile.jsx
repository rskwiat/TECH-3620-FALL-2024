import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Link, useRouter, useRootNavigationState, useSegments } from 'expo-router';
import { useTheme, Text, Button } from 'react-native-paper';
import { usePocketBase } from '../../context/pocketbase';
import { useAuth } from '../../context/auth';

export default function Profile() {
  const theme = useTheme();
  const { pb } = usePocketBase();

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
          }}>Profile Coming Soon</Text>
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
