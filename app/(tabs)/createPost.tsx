import { SafeAreaView, View } from 'react-native';
import { Text, TextInput, Button, FAB } from 'react-native-paper';
import { useRouter } from "expo-router";
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/context/auth';
import pb from '@/lib/pocketbase';

export default function CreatePostPage() {
  const { user } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    const submitRecordTest = {
      "title": data.title,
      "post": data.post,
      "userId": user.id,
    };

    await pb.collection('posts').create(submitRecordTest);
    await router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
      }}>
        <FAB
          icon='close'
          size='small'
          mode='flat'
          style={{ backgroundColor: 'none' }}
          onPress={() => router.replace('/(tabs)')}
        />
      </View>

      <Text
        style={{
          margin: 20,
        }}
        variant="titleLarge"
      >
        Create a New Post
      </Text>

      <Controller
        control={control}
        name="title"
        render={(props) => {
          return (
            <TextInput
              label="title"
              style={{
                marginBottom: 20,
              }}
              value={props.field.value}
              onBlur={props.field.onBlur}
              onChangeText={(value) => props.field.onChange(value)}
            />
          )
        }}
      />

      <Controller
        control={control}
        name="post"
        render={(props) => {
          return (
            <TextInput
              label="Post"
              multiline
              numberOfLines={10}
              maxLength={300}
              style={{
                marginHorizontal: 20,
                height: 225
              }}
              value={props.field.value}
              onBlur={props.field.onBlur}
              onChangeText={(value) => props.field.onChange(value)}
            />
          )
        }}
      />

      <FAB
        icon='arrow-collapse-up'
        style={{
          margin: 16,
          width: 55,
          position: 'absolute',
          bottom: 25,
          right: 25,
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  )
};
