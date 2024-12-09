import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme, Button, FAB } from 'react-native-paper';
import Posts from '../../components/posts/Posts';
import { usePocketBase } from '../../context/pocketbase';

export default function App() {
  const theme = useTheme();
  const { pb } = usePocketBase();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  //@todo refactor this to fetch data on dismiss of the create new post index
  const fetchData = async () => {
    const { items } = await pb.collection('posts').getList(page, 25);
    const total = await pb.collection('posts').getFullList();
    const max = Math.round(total.length / 25);
    setMaxPage(max);
    setPosts(items);
    setRefreshing(false);
  };

  useEffect(() => {
    setRefreshing(true);
    fetchData();
  }, [page]);

  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: theme.colors.background,
    }}>

      <FlatList
        data={posts}
        extraData={posts}
        onRefresh={() => fetchData()}
        refreshing={refreshing}
        renderItem={({ item, index }) => (
          <Posts key={index} data={item} />
        )}
      />
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

      <View style={styles.fabWrapper}>
        <FAB
          onPress={() => router.push('/(posts)')}
          icon='plus'
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView >
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
    marginHorizontal: 60,
    marginVertical: 15,
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
