import { View, Alert, Platform } from 'react-native';
import { z, ZodType } from 'zod';
import useFilter from '@/src/hooks/useFilter';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';
import CustomText from '@/src/components/CustomText';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import nunitoRegular from '@/src/assets/fonts/Nunito-Regular.ttf';
import CustomButton from '@/src/components/CustomButton';
import TimeFilter from '@/src/components/TimeFilter/TimeFilter';
import TimeFilterWeb from '@/src/components/TimeFilter/TimeFilterWeb';
import { useState } from 'react';

type FormData = {
  startDate: Date;
  endDate: Date;
};

const dateValidationSchema: ZodType<FormData> = z
  .object({
    startDate: z.coerce.date().refine((data) => data >= new Date(), {
      message: 'Start date must be in the future.',
    }),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
  });

const validateDates = (startDate: Date | null, endDate: Date | null) => {
  const result = dateValidationSchema.safeParse({ startDate, endDate });
  if (!result.success) {
    Alert.alert(result.error.errors[0].message);
    return { success: false, message: result.error.errors[0].message };
  }
  return { success: true };
};

export default function TimeFilterScreen() {
  const { colors } = useTheme();
  const { startDate, setStartDate, endDate, setEndDate } = useFilter();
  const [webErrorMessages, setWebErrorMessages] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({
    startDate: '',
    endDate: '',
  });

  const { LL } = useI18nContext();
  const styles = useStyles();
  const [fontsLoaded, error] = useFonts({
    'Nunito-Regular': nunitoRegular,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  const handleSearch = () => {
    if (startDate && endDate) {
      router.replace('/(tabs)/(home)');
    } else {
      if (Platform.OS === 'web') {
        window.alert(LL.SELECT_START_AND_END());
      } else Alert.alert(LL.SELECT_START_AND_END());
    }
  };

  const clearSearch = () => {
    setStartDate(null);
    setEndDate(null);
    setWebErrorMessages({
      startDate: '',
      endDate: '',
    });
  };

  const handleReset = () => {
    if (Platform.OS === 'web') {
      const confirm = window.confirm(
        `${LL.RESET_CONFIRM()} ${LL.RESET_WARNING()}`
      );
      if (confirm) {
        clearSearch();
      }
    } else {
      Alert.alert(LL.RESET_CONFIRM(), LL.RESET_WARNING(), [
        {
          text: LL.CANCEL(),
          style: 'cancel',
        },
        { text: LL.CLEAR(), onPress: clearSearch },
      ]);
    }
  };

  return (
    <View
      style={[
        styles.flexContainer,
        styles.scrollContainer,
        {
          backgroundColor: colors.background,
          justifyContent: 'center',
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            alignSelf: 'center',
          },
        ]}
      >
        <CustomText
          isBig
          style={{
            textAlign: 'center',
          }}
        >
          {LL.SELECT_TIME_RANGE()}
        </CustomText>
        {Platform.OS === 'ios' || Platform.OS === 'android' ? (
          <TimeFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            validateDates={validateDates}
          />
        ) : (
          <TimeFilterWeb
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            validateDates={validateDates}
            errorMessages={webErrorMessages}
            setErrorMessages={setWebErrorMessages}
          />
        )}
        <CustomButton onPress={handleSearch} label={LL.SEARCH_CLASSROOMS()} />
        {(startDate || endDate) && (
          <CustomButton onPress={handleReset} label={LL.CLEAR_DATES()} />
        )}
      </View>
    </View>
  );
}
