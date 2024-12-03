import { useState, useEffect, useMemo } from "react";
import { View, Alert } from "react-native";
import {
  Card,
  Text,
  Avatar,
  Button,
} from "react-native-paper";
import { Link } from "expo-router";

import pb from "@/lib/pocketbase";
import { useAuth } from "@/context/auth";

export default function Posts({ data, refetch }: any) {
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState({} as any);

  const cleanedText = data.post.replace(/<\/?p>/g, '').replace(/&rsquo;/g, "'").replace(/&mdash;/g, '-');
  const date = new Date(data.created).toLocaleString();

  useEffect(() => {
    const getAvatar = async () => {
      const userCollection = await pb.collection('users').getOne(data?.userId);
      const imageUrl = await pb.getFileUrl(userCollection, userCollection.avatar);

      setUser({
        image: imageUrl,
        username: userCollection.username
      });
    }
    getAvatar();
  }, []);

  const deletePost = (id: string) => {
    Alert.alert(
      'Delete Post',
      'Are you sure',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await pb.collection('posts').delete(id);
            await refetch();
          }
        },
      ]
    );
  }

  return (
    <View>
      <Card style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Card.Content>
          <Link href={`/(tabs)/users/${user.id}`}>
            <Avatar.Image size={75} source={{ uri: user.image }} />
          </Link>

          <Text variant="bodySmall">{user.username}</Text>

          <Text variant="titleMedium">{data.title}</Text>
          <Text variant="bodyMedium">{cleanedText}</Text>
        </Card.Content>

        <Card.Content style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}
        >
          <Text variant="bodySmall">{date}</Text>
          <Button
            onPress={() => { console.log('share post', data.id) }}
          >
            <Text variant="bodySmall">Share</Text>
          </Button>

          <Button
            onPress={() => { console.log('reply post', data.id) }}
          >
            <Text variant="bodySmall">Reply</Text>
          </Button>

          {currentUser.id === data.userId &&
            <Button
              onPress={() => deletePost(data.id)}
            >
              <Text variant="bodySmall">Delete</Text>
            </Button>
          }
        </Card.Content>


      </Card>
    </View>
  )
}
