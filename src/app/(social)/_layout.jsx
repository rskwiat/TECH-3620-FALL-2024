import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
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
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onBackground,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
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
