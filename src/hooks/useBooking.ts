import { useMutation } from '@apollo/client';
import { CREATE_BOOKING } from '@/src/graphql/mutations';
import { BOOKINGS } from '../graphql/queries';
import { BookingsQuery } from '@/__generated__/graphql';

const useBooking = (): [
  (
    roomId: string,
    bookingTime: [number, number],
    title?: string
  ) => Promise<unknown>,
  { loading: boolean },
] => {
  const [mutate, { loading }] = useMutation(CREATE_BOOKING, {
    update: (cache, { data }) => {
      if (!data?.createBooking) return;
      const bookingsData = cache.readQuery({ query: BOOKINGS }) || {
        bookings: [],
      };
      cache.writeQuery({
        query: BOOKINGS,
        data: {
          ...data,
          bookings: bookingsData?.bookings.concat(data?.createBooking),
        } as BookingsQuery,
        broadcast: false,
      });
    },
  });

  const createBooking = async (
    roomId: string,
    bookingTime: [number, number],
    title?: string
  ) => {
    try {
      const { data } = await mutate({
        variables: { roomId, bookingTime, title },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return [createBooking, { loading }];
};

export default useBooking;
