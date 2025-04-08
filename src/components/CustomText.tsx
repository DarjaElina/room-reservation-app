import { Text, TextProps } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import nunitoRegular from '../assets/fonts/Nunito-Regular.ttf';
import nunitoBold from '../assets/fonts/Nunito-Bold.ttf';
import { useTheme } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync(); // only once, globally

type Props = TextProps & {
  fontFamily?: 'Nunito-Regular' | 'Nunito-Bold';
  children: React.ReactNode;
};

export default function CustomText({
  fontFamily = 'Nunito-Regular',
  style,
  children,
  ...rest
}: Props) {
  const { colors } = useTheme();
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
    <Text style={[{ fontFamily, color: colors.text }, style]} {...rest}>
      {children}
    </Text>
  );
}
