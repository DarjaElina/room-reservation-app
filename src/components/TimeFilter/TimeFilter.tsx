import { View, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import useStyles from '@/src/hooks/useStyles';
import { useI18nContext } from '@/src/i18n/i18n-react';

export interface TimeFilterProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  validateDates: (
    startDate: Date | null,
    endDate: Date | null
  ) =>
    | {
        success: boolean;
        message: string;
      }
    | {
        success: boolean;
        message?: undefined;
      };
}

const TimeFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  validateDates,
}: TimeFilterProps) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const { colors } = useTheme();
  const styles = useStyles();
  const { LL } = useI18nContext();

  const showStartDatePicker = () => setStartDatePickerVisibility(true);
  const hideStartDatePicker = () => setStartDatePickerVisibility(false);
  const showEndDatePicker = () => setEndDatePickerVisibility(true);
  const hideEndDatePicker = () => setEndDatePickerVisibility(false);

  const handleStartDateConfirm = (date: Date) => {
    const clonedDate = new Date(date);
    const validation = validateDates(
      date,
      new Date(clonedDate.setHours(clonedDate.getHours() + 1))
    );
    if (validation.success) {
      setStartDate(date);
      const endDateTime = new Date(date);
      endDateTime.setHours(date.getHours() + 1);
      setEndDate(endDateTime);
      hideStartDatePicker();
    }
  };

  const handleEndDateConfirm = (time: {
    getHours: () => number;
    getMinutes: () => number;
  }) => {
    if (startDate) {
      const endDateTime = new Date(startDate);
      endDateTime.setHours(time.getHours());
      endDateTime.setMinutes(time.getMinutes());
      const validation = validateDates(startDate, endDateTime);
      if (validation.success) {
        setEndDate(endDateTime);
        hideEndDatePicker();
      }
    } else Alert.alert(LL.SELECT_START_DATE());
  };

  return (
    <View>
      <TextInput
        activeUnderlineColor={colors.primary}
        label="Start Date"
        value={
          startDate
            ? `${startDate.toDateString()}, ${startDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
            : ''
        }
        onPressIn={showStartDatePicker}
        style={[styles.input]}
        placeholderTextColor={colors.text}
        textColor={colors.text}
      />
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        minimumDate={new Date()}
        minuteInterval={15}
      />

      <TextInput
        activeUnderlineColor={colors.primary}
        label="End Date"
        value={
          endDate
            ? `${endDate.toDateString()}, ${endDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
            : ''
        }
        onPressIn={showEndDatePicker}
        style={[styles.input]}
        placeholderTextColor={colors.text}
        textColor={colors.text}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="time"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        minuteInterval={15}
      />
    </View>
  );
};

export default TimeFilter;
