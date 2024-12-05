import { Tabs } from 'expo-router';
import NavBar from '../../components/Navbar';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        header: (props) => <NavBar {...props} />
      }}>
      <Tabs.Screen name='index' options={{ title: 'Posts' }} />
    </Tabs>
  )
};
