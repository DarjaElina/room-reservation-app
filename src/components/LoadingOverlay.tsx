import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

const LoadingOverlay = () => {
  const { colors } = useTheme();
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
    </View>
  );
};

export default LoadingOverlay;
