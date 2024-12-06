import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { Link, useRouter, useRootNavigationState, useSegments } from 'expo-router';
import { useTheme, Text, Button, FAB } from 'react-native-paper';
import Posts from '../../components/posts/Posts';
import { useAuth } from '../../context/auth';
import { usePocketBase } from '../../context/pocketbase';


export default function App() {
  const theme = useTheme();
  const { pb } = usePocketBase();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const { items } = await pb.collection('posts').getList(page, 5);
    const total = await pb.collection('posts').getFullList();
    const max = Math.round(total.length / 6);
    setMaxPage(max);
    setPosts(items);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>

      <ScrollView style={{
        backgroundColor: theme.colors.background,
      }}>

        {/* @todo: look into flat list -- may help bugs */}
        {posts.map((post, i) => {
          return <Posts key={i} data={post} refetch={fetchData} />
        })}

        <View style={styles.prevNextButtons}>
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
      <View style={styles.fabWrapper}>
        <FAB
          onPress={() => router.push('/(posts)')}
          icon='plus'
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 20,
  },
  butttonWrapper: {
    marginTop: 'auto',
    marginHorizontal: 20,
  },
  prevNextButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 120
  },
  fabWrapper: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 50,
  }
});
