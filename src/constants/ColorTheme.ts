import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export interface ColorTheme {
  background: string;
  card: string;
  text: string;
  border: string;
  borderLight: string;
  primary: string;
  primaryHovered: string;
  primaryPressed: string;
  error: string;
  errorHovered: string;
  errorPressed: string;
  success: string;
  favorite: string;
  favoriteHovered: string;
  favoritePressed: string;
  favoriteActive: string;
  favoriteActiveHovered: string;
  favoriteActivePressed: string;
}

export const lightColors: ColorTheme = {
  background: 'rgba(245, 250, 255, 1)',
  card: '#ffffff',
  text: 'rgb(21, 26, 31)',
  border: '#71a9f7',
  borderLight: 'rgba(113, 169, 247, 0.3)',
  primary: '#71a9f7',
  primaryHovered: '#4D90F4',
  primaryPressed: '#357AE8',
  error: '#E9192D',
  errorHovered: '#FF3C5C',
  errorPressed: '#C7162A',
  success: '#3F7D58',
  favorite: '#c8aca9',
  favoriteHovered: '#AE8985',
  favoritePressed: '#976F6B',
  favoriteActive: '#E75480',
  favoriteActiveHovered: '#D52D57',
  favoriteActivePressed: '#B81E40',
};

export const darkColors: ColorTheme = {
  background: 'rgb(18, 20, 22)',
  card: 'rgb(30, 32, 34)',
  text: '#ffffff',
  border: '#7BB1FF',
  borderLight: 'rgba(123, 177, 255, 0.3)',
  primary: '#7BB1FF',
  primaryHovered: '#A0CFFF',
  primaryPressed: '#91BEFF',
  error: '#FF5C5C',
  errorHovered: '#FF6E76',
  errorPressed: '#D83A3A',
  success: '#00A36C',
  favorite: '#F1DDCF',
  favoriteHovered: '#D8C6BA',
  favoritePressed: '#C0B0A5',
  favoriteActive: '#fbaed2',
  favoriteActiveHovered: '#ffdfed',
  favoriteActivePressed: '#e5c1d1',
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
