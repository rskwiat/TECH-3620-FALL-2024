import { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Card,
  Text,
  Avatar,
  Button,
} from "react-native-paper";

import pb from "@/lib/pocketbase";

export default function Posts({ data }: any) {
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
    };
    getAvatar();
  }, [data]);

  return (
    <View>
      <Card style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Card.Content>
          <Avatar.Image size={75} source={{ uri: user.image }} />
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

          <Button
            onPress={() => { console.log('delete post', data.id) }}
          >
            <Text variant="bodySmall">Delete</Text>
          </Button>
        </Card.Content>


      </Card>
    </View>
  )
}
