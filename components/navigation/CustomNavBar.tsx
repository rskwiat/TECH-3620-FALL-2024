import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back
}) {
  const name = route?.name || "";
  const title = getHeaderTitle(options, name);
  const router = useRouter();

  const { appSignOut } = useAuth();

  const onMyProfilePress = () => {
    router.replace('/(tabs)/myProfile');
  }

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
          onPress: () => appSignOut()
        },
      ]
    )
  }
  return (
    <Appbar.Header mode='small'>
      <Appbar.Action
        size={30}
        icon="account-circle"
        onPress={() => onMyProfilePress()} />
      <Appbar.Content title={title} />
      <Appbar.Action
        icon="logout"
        size={30}
        onPress={() => onLogoutPress()}
      />
    </Appbar.Header>
  );
}
