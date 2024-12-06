import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import NavBar from '../../components/Navbar';

const ICON_SIZE = 28;

const tabs = [
  {
    name: 'index',
    title: 'Posts',
    iconName: 'home'
  },
  {
    name: 'search',
    title: 'Search',
    iconName: 'search'
  },
  {
    name: 'messages',
    title: 'Messages',
    iconName: 'message'
  },
  {
    name: 'alerts',
    title: 'Alerts',
    iconName: 'bar-chart'
  },
  {
    name: 'profile',
    title: 'Profile',
    iconName: 'supervised-user-circle'
  }
];

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        header: (props) => <NavBar {...props} />
      }}>

      {tabs.map((tab, i) => {
        return (
          <Tabs.Screen
            key={`${tab.name}-${i}`}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }) => <MaterialIcons size={ICON_SIZE} name={tab.iconName} color={color} />
            }}
          />
        );
      })}
    </Tabs>
  );
};
