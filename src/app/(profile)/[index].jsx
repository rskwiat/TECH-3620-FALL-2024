import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme, Text, Avatar } from 'react-native-paper';
import { usePocketBase } from '../../context/pocketbase';


export default function UserProfile() {
  const [user, setUser] = useState({});

  const theme = useTheme();
  const params = useLocalSearchParams();
  const { pb } = usePocketBase();

  const fetchUserData = async () => {
    const record = await pb.collection('users').getOne(params.index);
    const imageUrl = pb.files.getURL(record, record.avatar);
    setUser({
      ...record,
      avatar: imageUrl
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>
      <Stack.Screen options={{ title: user.username }} />
      <Avatar.Image size={200} source={{ uri: user.avatar }} />

      <Text variant="titleSmall">Email Address:</Text>
      <Text variant="bodySmall">{user?.email}</Text>
      <Text variant="titleSmall">User Name:</Text>
      <Text variant="bodySmall">{user?.username} {user?.name}</Text>
      <Text variant="titleSmall">Profile:</Text>
      <Text variant="bodySmall">{user?.profile}</Text>
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
