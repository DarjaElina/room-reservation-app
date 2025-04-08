import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';

interface UserNotificationProps {
  text: string | null | undefined;
  type: 'success' | 'error' | undefined;
}

export default function UserMessage({ text, type }: UserNotificationProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  if (!text) {
    return null;
  }
  return (
    <View
      style={[
        styles.userMessageContainer,
        {
          backgroundColor: colors.background,
          borderColor: type === 'success' ? colors.success : colors.error,
        },
      ]}
    >
      <CustomText style={styles.mediumText}>{text}</CustomText>
    </View>
  );
}
