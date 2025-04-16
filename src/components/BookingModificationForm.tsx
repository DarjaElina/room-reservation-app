import { useState } from 'react';
import { View, Alert, Platform, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import useUpdateBooking from '@/src/hooks/useUpdateBooking';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import UserMessage from './UserMessage';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import { ApolloError } from '@apollo/client';
import LoadingOverlay from './LoadingOverlay';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

interface BookingModificationFormProps {
  initialData: {
    title?: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
    id: string;
  };
  onCancel: () => void;
}

const BookingModificationForm: React.FC<BookingModificationFormProps> = ({
  initialData,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const { colors } = useTheme();
  const [updateBooking, { loading }] = useUpdateBooking();
  const [userMessage, setUserMessage] = useState<{
    message: string;
    type: 'error' | 'success';
  } | null>(null);
  const { LL } = useI18nContext();
  const styles = useStyles();
  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSave = async () => {
    try {
      await updateBooking(
        initialData.id,
        [
          new Date(initialData.startDate).getTime(),
          new Date(initialData.endDate).getTime(),
        ],
        initialData.roomId,
        title
      );
      setUserMessage({
        message: LL.BOOKING_UPDATED_SUCCESSFULLY(),
        type: 'success',
      });
      setTitle('');
      setTimeout(() => {
        setUserMessage(null);
        onCancel();
        router.navigate('/(tabs)/(home)');
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        const message =
          error.graphQLErrors?.[0]?.message || 'Something went wrong!';
        if (Platform.OS === 'web') {
          setUserMessage({ message, type: 'error' });
          setTimeout(() => {
            setUserMessage(null);
          }, 2000);
        } else Alert.alert('Error', message);
      }
      console.log(error);
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  const handleNavigateToDatePicker = (type: 'start' | 'end') => {
    onCancel();
    router.push({
      pathname: `/(tabs)/(home)/rooms/[id]/modify-booking`,
      params: {
        id: initialData.roomId,
        start: new Date(initialData.startDate).toISOString(),
        end: new Date(initialData.endDate).toISOString(),
        bookingId: initialData.id,
      },
    });
  };

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          alignSelf: 'center',
          gap: 10,
        },
      ]}
    >
      <UserMessage text={userMessage?.message} type={userMessage?.type} />
      <TextInput
        mode="flat"
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            fontFamily: 'Nunito-Regular',
          },
        ]}
        value={title}
        onChangeText={setTitle}
        placeholder={LL.BOOKING_TITLE()}
        activeUnderlineColor={colors.primary}
        textColor={colors.text}
      />

      <View style={styles.textContainer}>
        <CustomText style={[styles.mediumText, styles.textContainer]}>
          {LL.STARTS()}:
        </CustomText>
        <Pressable
          onPress={() => handleNavigateToDatePicker('start')}
          style={[styles.datePressable, { backgroundColor: colors.card }]}
        >
          <CustomText style={[styles.mediumText]}>
            {formatDate(new Date(initialData.startDate))}
          </CustomText>
        </Pressable>
      </View>

      <View style={styles.textContainer}>
        <CustomText style={[styles.mediumText, styles.textContainer]}>
          {LL.ENDS()}:
        </CustomText>
        <Pressable
          onPress={() => handleNavigateToDatePicker('end')}
          style={[styles.datePressable, { backgroundColor: colors.card }]}
        >
          <CustomText style={[styles.mediumText]}>
            {formatDate(new Date(initialData.endDate))}
          </CustomText>
        </Pressable>
      </View>

      <View style={styles.flexButtonContainer}>
        <CustomButton onPress={handleSave} label={LL.SAVE()} />
        <CustomButton onPress={onCancel} label={LL.CANCEL()} variant="error" />
      </View>
    </View>
  );
};

export default BookingModificationForm;
