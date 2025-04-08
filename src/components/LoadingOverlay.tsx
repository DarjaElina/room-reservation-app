import { ActivityIndicator, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

const LoadingOverlay = () => {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();

  return (
    <View
      style={[
        styles.flexContainer,
        styles.scrollContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text
        style={[styles.mediumText, { color: colors.text, textAlign: 'center' }]}
      >
        {LL.LOADING()}
      </Text>
    </View>
  );
};

export default LoadingOverlay;
