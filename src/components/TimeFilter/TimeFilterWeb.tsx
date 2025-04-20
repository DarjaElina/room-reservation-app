import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '@/src/i18n/i18n-react';
import { TimeFilterProps } from './TimeFilter';
import CustomText from '../CustomText';

interface TimeFilterWebProps extends TimeFilterProps {
  errorMessages: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
  setErrorMessages: React.Dispatch<
    React.SetStateAction<{
      startDate: string | undefined;
      endDate: string | undefined;
    }>
  >;
}

const TimeFilterWeb = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  validateDates,
  errorMessages,
  setErrorMessages,
}: TimeFilterWebProps) => {
  const { colors } = useTheme();
  const { LL } = useI18nContext();

  const formatDateLocal = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const resetValidation = () => {
    setErrorMessages({
      startDate: '',
      endDate: '',
    });
  };

  const handleStartDateChange = (e: {
    target: { value: string | number | Date };
  }) => {
    resetValidation();
    const date = new Date(e.target.value);
    setStartDate(date);
    const endDateTime = new Date(date);
    endDateTime.setHours(date.getHours() + 1);
    setEndDate(endDateTime);
  };

  const handleEndDateChange = (e: {
    target: { value: string | number | Date };
  }) => {
    resetValidation();
    const date = new Date(e.target.value);
    setEndDate(date);
  };

  const handleStartDateBlur = (e: {
    target: { value: string | number | Date };
  }) => {
    const validation = validateDates(startDate, endDate);
    if (!validation.success) {
      setErrorMessages({ ...errorMessages, startDate: validation.message });
      e.target.value = '';
      setStartDate(null);
    }
  };

  const handleEndDateBlur = (e: {
    target: { value: string | number | Date };
  }) => {
    if (!startDate) {
      setErrorMessages({ ...errorMessages, startDate: LL.SELECT_START_DATE() });
      e.target.value = '';
      setEndDate(null);
      return;
    }
    const validation = validateDates(startDate, endDate);
    if (!validation.success) {
      setErrorMessages({ ...errorMessages, endDate: validation.message });
      e.target.value = '';
      setEndDate(null);
    }
  };

  return (
    <>
      <label
        htmlFor="startDate"
        style={{
          color: colors.text,
          padding: 5,
          fontFamily: 'Nunito-Regular',
        }}
      >
        {LL.STARTS()}:
      </label>
      <input
        id="startDate"
        type="datetime-local"
        min={formatDateLocal(new Date())}
        value={startDate ? formatDateLocal(startDate) : ''}
        onBlur={handleStartDateBlur}
        onChange={handleStartDateChange}
        style={{
          padding: 10,
          borderRadius: 5,
          border: '1px solid #ccc',
          fontSize: 16,
          margin: 10,
          width: '100%',
          alignSelf: 'center',
          borderWidth: 3,
          borderColor: errorMessages.startDate ? colors.error : '',
        }}
      />
      {errorMessages.startDate && (
        <CustomText isError>{errorMessages.startDate}</CustomText>
      )}
      <label
        htmlFor="endDate"
        style={{
          color: colors.text,
          padding: 5,
          fontFamily: 'Nunito-Regular',
        }}
      >
        {LL.ENDS()}:
      </label>
      <input
        id="endDate"
        type="datetime-local"
        value={endDate ? formatDateLocal(endDate) : ''}
        onBlur={handleEndDateBlur}
        onChange={handleEndDateChange}
        min={formatDateLocal(new Date())}
        style={{
          padding: 10,
          borderRadius: 5,
          border: '1px solid #ccc',
          fontSize: 16,
          margin: 10,
          width: '100%',
          alignSelf: 'center',
          borderWidth: 3,
          borderColor: errorMessages.endDate ? colors.error : '',
        }}
      />
      {errorMessages.endDate && (
        <CustomText isError>{errorMessages.endDate}</CustomText>
      )}
    </>
  );
};

export default TimeFilterWeb;
