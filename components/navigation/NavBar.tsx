import { Appbar } from "react-native-paper";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";

export default function NavBar() {
  //navigation
  const router = useRouter();
  const { appSignOut } = useAuth();

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
        onPress={() => { console.log('works') }} />
      <Appbar.Content
        title="Weclome" />
      <Appbar.Action
        icon="logout"
        size={30}
        onPress={() => onLogoutPress()}
      />

    </Appbar >
  );
}
