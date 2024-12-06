import React from 'react';
import { Appbar } from 'react-native-paper';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getHeaderTitle } from '@react-navigation/elements';
import { useAuth } from '../context/auth';

export default function NavBar({
  route,
  options
}) {
  const { signOut } = useAuth();
  const title = getHeaderTitle(options, route.name);
  const router = useRouter();

  const onLogoutPress = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)');
          }
        },
      ]
    );
  };

  return (
    <Appbar.Header mode="small">
      {/* <Appbar.Action
        size={30}
        icon="account-circle"
        onPress={() => onMyProfilePress()} /> */}
      <Appbar.Content title={title} />
      <Appbar.Action
        size={30}
        icon="logout"
        onPress={() => onLogoutPress()} />
    </Appbar.Header>
  );
};
