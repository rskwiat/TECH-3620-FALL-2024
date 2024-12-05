import { View } from "react-native";
import {
  Avatar,
  Text,
  Card,
  Button,
  useTheme,
} from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import NavBar from "@/components/navigation/NavBar";

import { useAuth } from "@/context/auth";
import pb from "@/lib/pocketbase";

export default function MyProfile() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const imageUrl = pb.getFileUrl(pb.authStore.model!, user.avatar);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen
        options={{
          title: 'My Profile',
        }}
      />
      <View style={{ marginTop: 40, marginBottom: 40, alignItems: 'center' }}>
        <Avatar.Image size={200} source={{ uri: imageUrl }} />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: 'space-around' }}
      >
        <Card style={{ width: 150 }}>
          <Card.Content>
            <Text variant="titleSmall">Email Address:</Text>
            <Text variant="bodySmall">{user.email}</Text>
          </Card.Content>
        </Card>

        <Card style={{ width: 150 }}>
          <Card.Content>
            <Text variant="titleSmall">User Name:</Text>
            <Text variant="bodySmall">{user.username}</Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={{ marginTop: 40, marginHorizontal: 20 }}>
        <Card.Content>
          <Text variant="titleSmall">Profile:</Text>
          <Text variant="bodySmall">{user.profile}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={{ marginHorizontal: 40, marginTop: 20 }}
        onPress={() => console.log('edit profile button')}>
        Edit Profile
      </Button>

      <Button
        mode="contained"
        style={{ marginHorizontal: 40, marginTop: 40 }}
        onPress={() => router.push('/(tabs)/')}>
        Go Back
      </Button>

    </View>
  );
}
