import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';

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
      <CustomText style={[styles.mediumText, { textAlign: 'center' }]}>
        {LL.LOADING()}
      </CustomText>
    </View>
  );
};

export default LoadingOverlay;
