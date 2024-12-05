import { Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';

export default function Route() {
  const local = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Loading User Data for: {local.user}</Text>
    </SafeAreaView>
  );
}
