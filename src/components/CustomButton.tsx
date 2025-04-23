import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

type Variant = 'primary' | 'error' | 'favorite' | 'favoriteActive';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const { colors } = useTheme();
  const styles = useStyles();

  const getColor = (state: 'default' | 'hovered' | 'pressed') => {
    const colorMap: Record<Variant, Record<string, string>> = {
      primary: {
        default: colors.primary,
        hovered: colors.primaryHovered,
        pressed: colors.primaryPressed,
      },
      error: {
        default: colors.error,
        hovered: colors.errorHovered,
        pressed: colors.errorPressed,
      },
      favorite: {
        default: colors.favorite,
        hovered: colors.favoriteHovered,
        pressed: colors.favoritePressed,
      },
      favoriteActive: {
        default: colors.favoriteActive,
        hovered: colors.favoriteActiveHovered,
        pressed: colors.favoriteActivePressed,
      },
    };
    return colorMap[variant][state];
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.button,
        {
          backgroundColor: pressed
            ? getColor('pressed')
            : hovered
              ? getColor('hovered')
              : getColor('default'),
        },
        style,
      ]}
    >
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </Pressable>
  );
};

export default CustomButton;
