import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Avatar,
} from 'react-native-paper';

import { useRouter } from 'expo-router';

import { usePocketBase } from '../../context/pocketbase';
import { useAuth } from '../../context/auth';
import CardButtons from './CardButtons';

export default function Posts({ data, refetch }) {
  const { user: currentUser } = useAuth();
  const { pb } = usePocketBase();
  const router = useRouter();
  const [user, setUser] = useState({});

  const cleanedText = data.post.replace(/<\/?p>/g, '').replace(/&rsquo;/g, '\'').replace(/&mdash;/g, '-');
  const date = new Date(data.created).toLocaleString();

  const getAvatar = async () => {
    const userCollection = await pb.collection('users').getOne(data?.userId);
    const imageUrl = await pb.files.getURL(userCollection, userCollection.avatar);

    setUser({
      image: imageUrl,
      username: userCollection.username
    });
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <TouchableOpacity onPress={() => {
              router.push({
                pathname: `./(profile)/${data?.userId}`,
                params: data?.userId
              });
            }}>
              <Avatar.Image size={75} source={{ uri: user.image }} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
              <Text variant="bodySmall">{user.username}</Text>
            </View>

          </View>
          <Text variant="titleMedium">{data.title}</Text>
          <Text variant="bodyMedium">{cleanedText}</Text>
        </Card.Content>

        <CardButtons date={date} userId={data} currentUser={currentUser} refetch={refetch} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10
  }
});
