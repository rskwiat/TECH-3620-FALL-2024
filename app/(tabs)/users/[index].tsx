import { Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';


export default function UserPage() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  console.log("Local:", local.user, "Global:", glob.user); return <SafeAreaView><Text>User Id: </Text></SafeAreaView>;
}
