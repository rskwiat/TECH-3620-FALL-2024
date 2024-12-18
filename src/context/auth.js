import React from 'react';
import { useSegments, useRouter, useNavigationContainerRef } from 'expo-router';
import { useState, useEffect, createContext, useContext } from 'react';
import { usePocketBase } from './pocketbase';

const AuthContext = createContext({
  signOut: () => {
    // Default to a no-op function.
  },
});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user, isInitialized) {
  const router = useRouter();
  const segments = useSegments();

  // Check that navigation is all good
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const rootNavRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = rootNavRef?.addListener('state', () => {
      setIsNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavRef.current]);

  useEffect(() => {
    if (!isNavigationReady || !isInitialized || hasRedirected) return;
    const inAuthGroup = segments[0] === '(auth)';

    if (!isInitialized) return;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/(auth)');
      setHasRedirected(true);
    } else if (user && inAuthGroup) {
      // eslint-disable-next-line no-console
      console.log('Redirecting to social...');
      router.replace('/(social)');
      setHasRedirected(true);
    }
  }, [user, segments, isNavigationReady, isInitialized, hasRedirected]);
}

export function AuthProvider({ children }) {
  const { pb } = usePocketBase();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (pb) {
        // Assuming your PocketBase setup includes some method to check auth status
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

  const createAccount = async ({ email, password, username, name }) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb.collection('users').create({
        email,
        username,
        password,
        passwordConfirm: password,
        name: name ?? '',
      });

      // Unsuccessful response throws, so we should be fine here

      // Send a verification email if you want
      // await pb.collection('users').requestVerification(email);

      return { user: resp };
    } catch (e) {
      return { error: e.response };
    }
  };

  const resetPassword = async (email) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb.collection('users').requestPasswordReset(email);
      return { user: resp };
    } catch (e) {
      return { error: e };
    }
  };

  useProtectedRoute(user, isInitialized);

  return (
    <AuthContext.Provider
      value={{
        signIn: (email, password) => appSignIn(email, password),
        signOut: () => appSignOut(),
        createAccount: ({ email, password, username, name }) =>
          createAccount({ email, password, username, name }),
        resetPassword,
        isLoggedIn,
        isInitialized,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
