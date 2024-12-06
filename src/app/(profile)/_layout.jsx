import React from 'react';
import { Stack, Slot } from 'expo-router';
import NavBar from '../../components/Navbar';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <NavBar {...props} />
      }}>
      <Slot />
    </Stack>
  );
};
