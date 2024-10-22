import { Appbar } from "react-native-paper";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";

export default function NavBar({
  title = "Welcome",
  profileButtonIsDisabled = false,
}) {
  //navigation
  const router = useRouter();
  const { appSignOut } = useAuth();

  const onMyProfilePress = () => {
    if (!profileButtonIsDisabled) {
      router.push('/(tabs)/myProfile');
    }
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
    <Appbar mode="small" style={{ marginTop: 65 }}>
      <Appbar.Action
        size={30}
        icon="account-circle"
        onPress={() => onMyProfilePress()} />
      <Appbar.Content
        title={title} />
      <Appbar.Action
        icon="logout"
        size={30}
        onPress={() => onLogoutPress()}
      />
    </Appbar >
  );
}
