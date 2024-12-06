import React, { createContext, useContext, useState, useEffect } from 'react';
import PocketBase, { AsyncAuthStore } from 'pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PocketBaseContext = createContext();

export const usePocketBase = () => useContext(PocketBaseContext);
// eslint-disable-next-line no-process-env, no-undef
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const PocketBaseProvider = ({ children }) => {
  const [pb, setPb] = useState();

  useEffect(() => {
    const initializePocketBase = async () => {
      const store = new AsyncAuthStore({
        save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
        initial: await AsyncStorage.getItem('pb_auth'),
        clear: async () => AsyncStorage.removeItem('pb_auth'),
      });
      const pbInstance = new PocketBase(BASE_URL, store);
      setPb(pbInstance);
    };

    initializePocketBase();
  }, []);

  return (
    <PocketBaseContext.Provider value={{ pb }}>
      {children}
    </PocketBaseContext.Provider>
  );
};
