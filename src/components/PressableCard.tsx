import { Pressable, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '@/src/hooks/useStyles';
import { ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface PressableCardProps {
  onPress: () => void;
  children: ReactNode;
  testID?: string;
  style?: ViewStyle;
}

export default function PressableCard({
  onPress,
  children,
  testID,
  style,
}: PressableCardProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.itemContainer,
        {
          boxShadow:
            colorScheme === 'light'
              ? 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
              : '',
          backgroundColor: pressed
            ? colors.primaryPressed + '11'
            : hovered
              ? colors.primaryHovered + '08'
              : colors.card,
          margin: styles.pressableCard.margin,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}
