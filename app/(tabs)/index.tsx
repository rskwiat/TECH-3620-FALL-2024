import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  SafeAreaView,
  ScrollView
} from "react-native";

import { Button, Text, FAB, useTheme } from "react-native-paper";

import NavBar from "@/components/navigation/NavBar";
import Posts from "@/components/Posts";
import pb from "@/lib/pocketbase";

export default function HomeScreen() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [posts, setPosts] = useState([] as any);
  const router = useRouter();

  const fetchData = async () => {
    const { items } = await pb.collection('posts').getList(page, 6);
    const total = await pb.collection('posts').getFullList();
    const max = Math.round(total.length / 6);
    setMaxPage(max);
    setPosts(items);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Button
        mode="contained"
        style={{
          marginTop: 20,
          marginBottom: 40,
          marginHorizontal: 20
        }}
        onPress={() => router.replace('/(tabs)/createPost')}
      >
        Create Post
      </Button>

      <ScrollView style={{ flex: 1 }}>
        {posts.map((post: any, i: any) => {
          return <Posts key={i} data={post} refetch={fetchData} />
        })}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 120
        }}>
          <Button
            disabled={page === 1}
            onPress={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={page === maxPage}
            onPress={() => setPage(page + 1)}
          >
            Next
          </Button>
        </View>
      </ScrollView>
      <View style={{
        position: 'absolute',
        right: 25,
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 50,
      }}>
        <FAB
          icon='plus'
          onPress={() => router.replace('/(tabs)/createPost')}
        />
      </View>
    </View>
  );
}
