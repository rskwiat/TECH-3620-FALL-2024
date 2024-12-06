import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { usePocketBase } from '../../context/pocketbase';

export default function CardButtons({
  date,
  userId,
  currentUser,
  refetch
}) {
  const { pb } = usePocketBase();

  const deletePost = (id) => {
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
  };

  return (
    <Card.Content style={styles.cardButtons}
    >
      <Text variant="bodySmall">{date}</Text>
      <Button
        onPress={() => { console.log('share post', userId.id); }}
      >
        <Text variant="bodySmall">Share</Text>
      </Button>

      <Button
        onPress={() => { console.log('reply post', userId.id); }}
      >
        <Text variant="bodySmall">Reply</Text>
      </Button>

      {currentUser?.id === userId?.userId &&
        <Button
          onPress={() => deletePost(userId.id)}
        >
          <Text variant="bodySmall">Delete</Text>
        </Button>
      }
    </Card.Content>
  );
};

const styles = StyleSheet.create({
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
