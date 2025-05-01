/* eslint-disable no-case-declarations */
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';
import { onError } from '@apollo/client/link/error';
const authStorage = new AuthStorage();

export const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_BACKEND_URL,
});

export const authLink = setContext(async (_, previousContext) => {
  const token = await authStorage.getToken('access');
  return {
    ...previousContext,
    headers: {
      ...previousContext?.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const REFRESH_TOKEN_PATH_NAME = 'refreshToken';

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) return;

  for (const { path, extensions } of graphQLErrors) {
    if ((extensions && extensions.code !== 'UNAUTHENTICATED') || !path)
      continue;
    if (path.includes(REFRESH_TOKEN_PATH_NAME)) break;

    const { getContext, setContext } = operation;
    const context = getContext();

    setContext({
      ...context,
      headers: {
        ...context?.headers,
        _needsRefresh: true,
      },
    });

    return forward(operation);
  }
});
