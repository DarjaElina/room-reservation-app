import { FlatList, View } from 'react-native';
import BookingItem from './BookingItem';
import useBookings from '@/src/hooks/useBookings';
import QueryResult from './QueryResult';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';
import { BookingsQueryVariables } from '@/__generated__/graphql';
import CustomText from './CustomText';

interface BookingListProps {
  queryOptions: BookingsQueryVariables;
  emptyMessage: string;
}

export default function BookingList({
  queryOptions,
  emptyMessage,
}: BookingListProps) {
  const { loading, bookings, error } = useBookings(queryOptions);
  const { colors } = useTheme();
  const styles = useStyles();

  if (!loading && bookings.length <= 0) {
    return <CustomText style={styles.userMessage}>{emptyMessage}</CustomText>;
  }

  const sortedBookings = [...bookings].sort(
    (a, b) =>
      new Date(a.bookingTime[0].value).getTime() -
      new Date(b.bookingTime[0].value).getTime()
  );

  return (
    <QueryResult error={error} loading={loading} data={bookings}>
      <View
        style={[
          styles.flexContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <FlatList
          data={sortedBookings}
          renderItem={({ item }) => (
            <BookingItem
              startDate={item.bookingTime[0].value}
              endDate={item.bookingTime[1].value}
              roomCode={item.room.code}
              title={item.title || ''}
              id={item.id}
              roomId={item.room.id}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </QueryResult>
  );
}
