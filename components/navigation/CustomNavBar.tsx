import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";

export default function CustomNavigationBar(props: any) {

  // const title = getHeaderTitle(options, route.name);
  const router = useRouter();
  const { appSignOut } = useAuth();

  // const onMyProfilePress = () => {
  //   if (!profileButtonIsDisabled) {
  //     router.push('/(tabs)/myProfile');
  //   }
  // }

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
        onPress={() => console.log('back or e')} />
      {/* <Appbar.Content title={title} /> */}
      <Appbar.Action
        icon="logout"
        size={30}
        onPress={() => onLogoutPress()}
      />
    </Appbar.Header>
  );
}
