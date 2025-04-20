import { InMemoryCache } from '@apollo/client';
import {
  relayStylePagination,
  StoreObject,
  Reference,
} from '@apollo/client/utilities';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        rooms: relayStylePagination(),
      },
    },
    Room: {
      fields: {
        equipment: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          merge(existing = [], incoming: any[], { readField }) {
            if (
              readField(
                'id',
                incoming as unknown as Reference | StoreObject | undefined
              )
            ) {
              return [...existing, ...incoming];
            }
            return incoming;
          },
        },
      },
    },
  },
});
