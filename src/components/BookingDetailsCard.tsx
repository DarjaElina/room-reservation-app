import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

interface BookingDetailsCardProps {
  roomCode?: string | null;
  bookingStartDate: string;
  bookingEndDate: string;
  bookingTitle: string;
  setBookingTitle: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  onSubmit: () => void;
  buttonText: string;
  loading: boolean;
}

export default function BookingDetailsCard({
  roomCode,
  bookingStartDate,
  bookingEndDate,
  bookingTitle,
  setBookingTitle,
  error,
  onSubmit,
  buttonText,
  loading,
}: BookingDetailsCardProps) {
  const { colors } = useTheme();
  const formatReadableDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const { LL } = useI18nContext();
  const styles = useStyles();

  return (
    <View
      style={[
        styles.bookingDetailsCard,
        {
          backgroundColor: colors.card,
          alignSelf: 'center',
        },
      ]}
    >
      <View style={[styles.iconTextContainer, { margin: 'auto' }]}>
        <FontAwesome5 name="calendar-check" size={24} color={colors.text} />
        <CustomText style={styles.subheading}>
          {LL.BOOKING_DETAILS()}
        </CustomText>
      </View>
      <CustomText>
        <CustomText style={styles.mediumText}>{LL.TITLE()}</CustomText>
      </CustomText>
      <TextInput
        mode="flat"
        style={[
          styles.input,
          {
            color: colors.text,
          },
        ]}
        value={bookingTitle}
        onChangeText={setBookingTitle}
        placeholder={LL.BOOKING_TITLE()}
        activeUnderlineColor={error ? colors.error : colors.primary}
        placeholderTextColor={colors.text}
        textColor={colors.text}
      />
      {error && (
        <CustomText style={[styles.errorText, { color: colors.error }]}>
          {error}
        </CustomText>
      )}
      <CustomText style={[styles.mediumText, styles.textContainer]}>
        <CustomText style={[styles.mediumText]}>{LL.ROOM()}:</CustomText>{' '}
        {roomCode}
      </CustomText>
      <CustomText style={[styles.mediumText, styles.textContainer]}>
        <CustomText>{LL.STARTS()}:</CustomText>{' '}
        {formatReadableDate(bookingStartDate)}
      </CustomText>
      <CustomText style={[styles.mediumText, styles.textContainer]}>
        <CustomText>{LL.ENDS()}:</CustomText>{' '}
        {formatReadableDate(bookingEndDate)}
      </CustomText>
      <CustomButton onPress={onSubmit} label={buttonText} />
    </View>
  );
}
