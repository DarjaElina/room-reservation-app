import { Pressable, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ReactNode } from 'react';

export default function PressableOutlineButton({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.primary,
          backgroundColor: pressed
            ? colors.primaryPressed + '11'
            : hovered
              ? colors.primaryHovered + '08'
              : 'transparent',
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}
