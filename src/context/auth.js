import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationContainerRef, useRouter, useSegments } from 'expo-router';
import pb from '../lib/pocketbase';


const AuthContext = createContext({});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user, isInitialized) {
  const router = useRouter();
  const segments = useSegments();

  // Check that navigation is all good
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const rootNavRef = useNavigationContainerRef();

  // Set ups a listener to check and see if the navigator is ready.
  useEffect(() => {
    const unsubscribe = rootNavRef?.addListener('state', (event) => {
      setIsNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavRef.current]);

  useEffect(() => {
    // Navigation isn't set up. Do nothing.
    if (!isNavigationReady) return;
    const inAuthGroup = segments[0] === '/app';

    if (!isInitialized) return;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/');
    } else if (user && inAuthGroup) {
      console.log('signed in')
      // Redirect away from the sign-in page.
      router.replace('/(social)');
    }
  }, [user, segments, isNavigationReady, isInitialized]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (pb) {
        const isLoggedIn = pb.authStore.isValid;
        setIsLoggedIn(isLoggedIn);
        setUser(isLoggedIn ? pb.authStore.model : null);
        setIsInitialized(true);
      }
    };

    checkAuthStatus();
  }, [pb]);

  const appSignIn = async (email, password) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb
        ?.collection('users')
        .authWithPassword(email, password);
      setUser(pb?.authStore.isValid ? pb.authStore.model : null);
      setIsLoggedIn(pb?.authStore.isValid ?? false);
      return { user: resp?.record };
    } catch (e) {
      return { error: e };
    }
  };

  const appSignOut = async () => {
    if (!pb) return { error: 'PocketBase not initialized' };
    try {
      await pb?.authStore.clear();
      setUser(null);
      setIsLoggedIn(false);
      return { user: null };
    } catch (e) {
      return { error: e };
    }
  };

  const createAccount = async (data) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb?.collection('users').create(data);
      await setUser(pb?.authStore.isValid ? pb.authStore.model : null);
      await setIsLoggedIn(pb?.authStore.isValid ?? false);
      return { user: resp, pb };
    } catch (e) {
      return { error: e };
    }
  }

  const resetPassword = async (email) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb.collection('users').requestPasswordReset(email);
      return { user: resp };
    } catch (e) {
      return { error: e };
    }
  }

  useProtectedRoute(user, isInitialized);

  return (
    <AuthContext.Provider
      value={{
        appSignIn,
        appSignOut,
        createAccount,
        user,
        resetPassword,
        isLoggedIn,
        isInitialized
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
