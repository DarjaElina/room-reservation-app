import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export interface ColorTheme {
  background: string;
  card: string;
  text: string;
  border: string;
  borderLight: string;
  primary: string;
  error: string;
  success: string;
}

export const lightColors: ColorTheme = {
  background: 'rgba(245, 250, 255, 1)',
  card: '#ffffff',
  text: 'rgb(21, 26, 31)',
  border: '#71a9f7',
  borderLight: 'rgba(113, 169, 247, 0.3)',
  primary: '#71a9f7',
  error: '#E9192D',
  success: '#3F7D58',
};

export const darkColors: ColorTheme = {
  background: 'rgb(18, 20, 22)',
  card: 'rgb(30, 32, 34)',
  text: '#ffffff',
  border: '#7BB1FF',
  borderLight: 'rgba(123, 177, 255, 0.3)',
  primary: '#7BB1FF',
  error: '#FF5C5C',
  success: '#00A36C',
};
export const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: lightColors.primary,
    ...lightColors,
    shadowOpacity: 0.2,
  },
};

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    notification: darkColors.error,
    ...darkColors,
    shadowOpacity: 0.6,
  },
};
export type Theme = typeof customDarkTheme | typeof customLightTheme;
