import { Image, StyleSheet, Platform, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/auth';

import NavBar from '@/components/navigation/NavBar';

export default function HomeScreen() {
  const { user, appSignOut } = useAuth();

  const logOut = async () => appSignOut();

  return (
    <View>
      <NavBar />
      {/* <ThemedText>{user.username}</ThemedText> */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
