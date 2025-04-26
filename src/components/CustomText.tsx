import { Text, TextProps } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import nunitoRegular from '../assets/fonts/Nunito-Regular.ttf';
import nunitoBold from '../assets/fonts/Nunito-Bold.ttf';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

SplashScreen.preventAutoHideAsync();

type Props = TextProps & {
  fontFamily?: 'Nunito-Regular' | 'Nunito-Bold';
  isBig?: boolean;
  isSmall?: boolean;
  isError?: boolean;
  children: React.ReactNode;
};

export default function CustomText({
  fontFamily = 'Nunito-Regular',
  style,
  children,
  isBig,
  isSmall,
  isError,
  ...rest
}: Props) {
  const { colors } = useTheme();
  const styles = useStyles();
  const [fontsLoaded, error] = useFonts({
    'Nunito-Regular': nunitoRegular,
    'Nunito-Bold': nunitoBold,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Text
      style={[
        {
          fontFamily,
          color: isError ? colors.error : colors.text,
          fontSize: styles.mediumText.fontSize,
        },
        style,
        isBig && styles.bigText,
        isSmall && styles.smallText,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
