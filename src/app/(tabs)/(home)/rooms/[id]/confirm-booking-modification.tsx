import { View, Alert, Platform } from 'react-native';
import QueryResult from '@/src/components/QueryResult';
import BookingDetailsCard from '@/src/components/BookingDetailsCard';
import UserMessage from '@/src/components/UserMessage';
import useBookingContext from '@/src/hooks/useBookingContext';
import { useLocalSearchParams } from 'expo-router';
import useRoom from '@/src/hooks/useRoom';
import useUpdateBooking from '@/src/hooks/useUpdateBooking';
import { useState } from 'react';
import { router } from 'expo-router';
import { ApolloError } from '@apollo/client';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';

export default function ConfirmBookingModificationScreen() {
  const { bookingStartDate, bookingEndDate } = useBookingContext();
  const { id, bookingId } = useLocalSearchParams<{
    id: string;
    bookingId: string;
  }>();
  const { loading: roomLoading, room, error: roomError } = useRoom(id);
  const [updateBooking, { loading }] = useUpdateBooking();
  const [userMessage, setUserMessage] = useState<{
    message: string;
    type: 'error' | 'success';
  } | null>(null);
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [error] = useState<string | null>(null);
  const { LL } = useI18nContext();
  const styles = useStyles();

  const handleSubmit = async () => {
    try {
      await updateBooking(
        bookingId,
        [
          new Date(bookingStartDate).getTime(),
          new Date(bookingEndDate).getTime(),
        ],
        id,
        bookingTitle.trim() || undefined
      );
      setUserMessage({
        message: LL.BOOKING_UPDATED_SUCCESSFULLY(),
        type: 'success',
      });
      setBookingTitle('');
      setTimeout(() => {
        setUserMessage(null);
        router.navigate('/(tabs)/(home)');
      }, 2000);
    } catch (error) {
      if (error instanceof ApolloError) {
        if (Platform.OS === 'web') {
          setUserMessage({ message: error.message, type: 'error' });
          setTimeout(() => {
            setUserMessage(null);
            router.navigate('/(tabs)/(home)');
          }, 2000);
        } else Alert.alert(error.message);
      }
    }
  };

  return (
    <QueryResult data={room} loading={roomLoading} error={roomError}>
      <View
        style={[
          styles.flexContainer,
          styles.scrollContainer,
          {
            justifyContent: 'center',
          },
        ]}
      >
        <UserMessage text={userMessage?.message} type={userMessage?.type} />
        {room && (
          <BookingDetailsCard
            roomCode={room.code}
            bookingStartDate={bookingStartDate}
            bookingEndDate={bookingEndDate}
            bookingTitle={bookingTitle}
            setBookingTitle={setBookingTitle}
            error={error}
            onSubmit={handleSubmit}
            buttonText={LL.SAVE()}
            loading={loading}
          />
        )}
      </View>
    </QueryResult>
  );
}
