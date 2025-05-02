import { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import useBookingContext from '@/src/hooks/useBookingContext';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';
import { useEffect } from 'react';

interface DatePickerProps {
  dateToModify?: Date;
}

export default function DatePicker({ dateToModify }: DatePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { date, setDate } = useBookingContext();
  const { colors } = useTheme();
  const styles = useStyles();

  useEffect(() => {
    if (dateToModify) {
      setDate(dateToModify);
    }
  }, [dateToModify, setDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  const handleNextDay = () => {
    setDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;
    });
  };

  const handlePrevDay = () => {
    setDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(nextDate.getDate() - 1);
      return nextDate;
    });
  };

  const toDateInputValue = (dateObject: Date) => {
    const local = new Date(dateObject);
    local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <AntDesign.Button
        testID="prev_day_button"
        backgroundColor="lightgrey"
        name="caretleft"
        size={24}
        color="black"
        onPress={handlePrevDay}
        disabled={date > new Date() ? false : true}
      />
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          backgroundColor: '#f0f0f0',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
        }}
      >
        {Platform.OS === 'android' || Platform.OS === 'ios' ? (
          <CustomText style={{ fontSize: 18, color: 'black' }}>
            {date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              weekday: 'short',
            })}
          </CustomText>
        ) : (
          <input
            min={toDateInputValue(new Date())}
            type="date"
            value={toDateInputValue(date)}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              handleConfirm(newDate);
            }}
            style={{
              backgroundColor: '#f0f0f0',
              padding: 8,
              borderRadius: 8,
              border: 'none',
              fontSize: 16,
              color: 'black',
              cursor: 'pointer',
            }}
          />
        )}
      </TouchableOpacity>
      {(Platform.OS === 'android' || Platform.OS === 'ios') && (
        <DateTimePickerModal
          testID="date_time_picker_modal"
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
      )}
      <AntDesign.Button
        testID="next_day_button"
        backgroundColor="lightgrey"
        name="caretright"
        size={24}
        color="black"
        onPress={handleNextDay}
      />
    </View>
  );
}
