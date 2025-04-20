/* eslint-disable no-case-declarations */
import { ApolloClient, ApolloLink } from '@apollo/client';
import { cache } from './apolloCache';
import { authLink, httpLink, errorLink } from './apolloLinks';
import { REFRESH_TOKEN } from '../graphql/mutations';
import AuthStorage from './authStorage';
import { setContext } from '@apollo/client/link/context';
import { router } from 'expo-router';

const authStorage = new AuthStorage();

export const refreshToken = async () => {
  try {
    const refreshToken = (await authStorage.getToken('refresh')) || '';
    const refreshResolverResponse = await apolloClient.mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        token: refreshToken,
      },
    });

    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
    if (accessToken) await authStorage.setToken(accessToken, 'access');
    return accessToken;
  } catch {
    return null;
  }
};

export const getRefreshTokenLink = setContext(async (_, previousContext) => {
  if (previousContext?.headers?._needsRefresh) {
    const token = await refreshToken();
    if (!token) {
      authStorage.removeToken('access');
      authStorage.removeToken('refresh');
      apolloClient.clearStore();
      router.navigate('/sign-in');
    }
  }
  return previousContext;
});

const createApolloClient = () => {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, getRefreshTokenLink, authLink, httpLink]),
    cache,
  });
};

const apolloClient = createApolloClient();

export default apolloClient;
