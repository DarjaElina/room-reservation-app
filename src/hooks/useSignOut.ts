import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { useState } from 'react';

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    try {
      setLoading(true);
      await authStorage?.removeAccessToken();
      await apolloClient.resetStore();
    } catch (error) {
      console.error('Sign-out failed', error);
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading };
};

export default useSignOut;
