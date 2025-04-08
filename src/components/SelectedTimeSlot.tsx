import { View, Text } from 'react-native';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';

interface SelectedTimeSlotProps {
  value?: string;
  color: string;
  bookingInfo?: {
    title: string | null | undefined;
    user: string;
  };
  displayBookingTitle?: boolean;
  displayBookingUser?: boolean;
}

export default function SelectedTimeSlot({
  value,
  color,
  bookingInfo,
  displayBookingTitle,
  displayBookingUser,
}: SelectedTimeSlotProps) {
  const styles = useStyles();

  return (
    <View
      testID="selected_time_slot"
      style={[styles.selectedTimeSlot, { backgroundColor: color }]}
    >
      {value && <Text style={{ color: '#fff' }}>{value}</Text>}
      {displayBookingTitle && (
        <CustomText style={{ color: '#fff' }}>{bookingInfo?.title}</CustomText>
      )}
      {displayBookingUser && (
        <CustomText style={{ color: '#fff' }}>{bookingInfo?.user}</CustomText>
      )}
    </View>
  );
}
