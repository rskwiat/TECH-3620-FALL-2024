import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView
} from "react-native";

import { Button, Text } from "react-native-paper";

import NavBar from "@/components/navigation/NavBar";
import Posts from "@/components/Posts";
import pb from "@/lib/pocketbase";

export default function HomeScreen() {
  const [posts, setPosts] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const { items } = await pb.collection('posts').getList(1, 50);
      setPosts(items);
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavBar title="Posts" />
      <Button
        mode="contained"
        style={{
          marginTop: 20,
          marginBottom: 40,
          marginHorizontal: 20
        }}
        onPress={() => console.log("posts page")}
      >
        Create Post
      </Button>
      <ScrollView>
        {posts.map((post: any, i: any) => {
          return <Posts key={i} data={post} />
        })}
      </ScrollView>

    </View>
  );
}
