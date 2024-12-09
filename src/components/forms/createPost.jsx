import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/auth';
import { usePocketBase } from '../../context/pocketbase';

import { postSchema } from '../../schemas/postSchema';

export default function CreatePost() {
  const theme = useTheme();
  const { user } = useAuth();
  const { pb } = usePocketBase();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    const submitData = {
      'title': data.title,
      'post': data.post,
      'userId': user.id,
    };

    await pb.collection('posts').create(submitData);
    router.replace('/(social)');

  };

  return (
    <View style={styles.formWrapper}>
      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Title"
            autoCapitalize="none"
            value={value} //props.field.value
            onBlur={onBlur} //props.field.onBlur
            onChangeText={value => onChange(value)}
          />
        )}
      />
      <Text
        variant="bodySmall"
        style={{
          color: theme.colors.error
        }}>{errors.name && errors?.name?.message}</Text>

      <Controller
        control={control}
        name='post'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Post"
            style={styles.textArea}
            multiline
            numberOfLines={10}
            maxLength={300}
            value={value} //props.field.value
            onBlur={onBlur} //props.field.onBlur
            onChangeText={value => onChange(value)}
          />
        )}
      />
      <Text
        variant="bodySmall"
        style={{
          color: theme.colors.error
        }}>{errors.name && errors?.name?.message}</Text>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        Create a post
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    padding: 20,
    backgroundColor: 'rgba(200,200,200,.3)',
    margin: 10,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  textArea: {
    height: 225,
  }
}); 
