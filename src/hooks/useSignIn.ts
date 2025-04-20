import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '@/src/graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, { loading }] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async (username: string, password: string) => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      });

      const accessToken = data?.authenticate?.accessToken;
      const refreshToken = data?.authenticate?.refreshToken;
      if (accessToken && refreshToken) {
        await authStorage?.setToken(accessToken, 'access');
        await authStorage?.setToken(refreshToken, 'refresh');
        apolloClient.resetStore();
      } else {
        throw new Error('Authentication failed, no token returned.');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

  return { signIn, loading };
};

export default useSignIn;
