import { View } from 'react-native';
import BookingList from '@/src/components/BookingList';
import useAuth from '@/src/hooks/useAuth';
import { BookingStatus } from '@/__generated__/graphql';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';
import { router } from 'expo-router';
import QueryResult from '@/src/components/QueryResult';

export default function AboutScreen() {
  const { user, loading, error } = useAuth();
  const { LL } = useI18nContext();
  const styles = useStyles();
  if (!user) {
    router.replace('/sign-in');
  }
  return (
    <QueryResult data={user} loading={loading} error={error}>
      <View style={[styles.flexContainer, styles.scrollContainer]}>
        <BookingList
          queryOptions={{ userId: user?.id, status: BookingStatus.Active }}
          emptyMessage={LL.NO_UPCOMING_BOOKINGS()}
        />
      </View>
    </QueryResult>
  );
}
