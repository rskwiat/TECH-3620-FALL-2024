import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { useTheme, Text, Avatar, Button } from 'react-native-paper';
import { usePocketBase } from '../../context/pocketbase';
import { useAuth } from '../../context/auth';

export default function Profile() {
  const theme = useTheme();
  const { pb } = usePocketBase();
  const { user } = useAuth();
  const imageUrl = pb.files.getUrl(pb.authStore.model, user.avatar);


  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>
      <View style={styles.wrapper}>

        <Avatar.Image size={200} source={{ uri: imageUrl }} />

        <Text variant="titleSmall">Email Address:</Text>
        <Text variant="bodySmall">{user.email}</Text>
        <Text variant="titleSmall">User Name:</Text>
        <Text variant="bodySmall">{user.username}</Text>
        <Text variant="titleSmall">Profile:</Text>
        <Text variant="bodySmall">{user.profile}</Text>

        <Button
          mode="contained"
          style={{ marginHorizontal: 40, marginTop: 20 }}
          onPress={() => console.log('edit profile button')}>
          Edit Profile
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
