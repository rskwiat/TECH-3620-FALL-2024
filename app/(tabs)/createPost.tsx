import { SafeAreaView, View } from 'react-native';
import { Text, TextInput, Button, FAB } from 'react-native-paper';
import { useRouter } from "expo-router";

export default function CreatePostPage() {
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log(data);
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

      <TextInput
        label="Post Title"
        style={{
          marginBottom: 20,
          marginHorizontal: 20,
        }}
      />

      <TextInput
        label="Post"
        multiline
        numberOfLines={10}
        maxLength={300}
        style={{
          marginHorizontal: 20,
          height: 225
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
        onPress={() => onSubmit()}
      />
    </SafeAreaView>
  )
};
