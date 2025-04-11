import { View, Pressable, Alert, Modal, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useCancelBooking from '@/src/hooks/useCancelBooking';
import BookingModificationForm from './BookingModificationForm';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import LoadingOverlay from './LoadingOverlay';
import CustomText from './CustomText';
interface BookingItemProps {
  startDate: Date;
  endDate: Date;
  roomCode: string;
  showCode?: boolean;
  title?: string;
  id: string;
  roomId: string;
}

export default function BookingItem({
  startDate,
  endDate,
  roomCode,
  title,
  id,
  roomId,
}: BookingItemProps) {
  const [cancelBooking, { loading }] = useCancelBooking();
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);
  const [showModal, setShowModal] = useState(false);
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelBooking(id);
      console.log('Booking cancelled successfully!');
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const confirmCancel = (id: string) => {
    if (Platform.OS === 'web') {
      const confirm = window.confirm(LL.CANCEL_BOOKING_MESSAGE());
      if (confirm) {
        handleCancel(id);
      }
    } else {
      Alert.alert(
        LL.CANCEL_BOOKING_TITLE(),
        LL.CANCEL_BOOKING_MESSAGE(),
        [
          {
            text: LL.CANCEL_BOOKING_NO(),
            style: 'cancel',
          },
          {
            text: LL.CANCEL_BOOKING_YES(),
            onPress: () => handleCancel(id),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <View
      style={[
        styles.bookingItemContainer,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <CustomText fontFamily="Nunito-Bold" style={styles.bigText}>
        {title}
      </CustomText>
      <CustomText style={styles.bigText}>{roomCode}</CustomText>
      <View style={styles.bookingItemDateContainer}>
        <FontAwesome
          name="calendar"
          size={styles.mediumText.fontSize}
          color={colors.text}
        />
        <CustomText style={styles.mediumText}>
          {formattedStartDate.toLocaleString(undefined, options)} -{' '}
          {formattedEndDate.toLocaleString(undefined, options)}
        </CustomText>
      </View>
      {new Date(startDate) > new Date() ? (
        <View style={styles.flexButtonContainer}>
          <Pressable
            disabled={loading}
            onPress={() => confirmCancel(id)}
            style={[
              styles.button,
              { backgroundColor: colors.error, flexDirection: 'row' },
            ]}
          >
            <CustomText
              style={[
                styles.buttonText,
                {
                  backgroundColor: colors.error,
                },
              ]}
            >
              {LL.CANCEL()}
            </CustomText>
          </Pressable>
          <Pressable
            onPress={() => setShowModal(true)}
            style={[
              styles.button,
              { backgroundColor: colors.primary, flexDirection: 'row' },
            ]}
          >
            <CustomText style={styles.buttonText}>{LL.MODIFY()}</CustomText>
          </Pressable>
          <Modal
            visible={showModal}
            animationType="slide"
            onRequestClose={() => setShowModal(false)}
          >
            <View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: colors.background,
                },
              ]}
            >
              <BookingModificationForm
                initialData={{
                  title,
                  roomId,
                  startDate,
                  endDate,
                  id,
                }}
                onCancel={() => setShowModal(false)}
              />
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
}
