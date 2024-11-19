import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function CreatePostPage() {
  return (
    <View>
      <Button mode='contained'> Go Back </Button>

      <Text>Create a New Post</Text>
      <TextInput
        label="Post Title"
      />

      <TextInput
        label="Post"
        multiline
        numberOfLines={10}
        maxLength={300}
      />

    </View>
  )
};
