import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import { ApolloError } from '@apollo/client';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';

interface QueryResultProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: unknown;
  children: React.ReactNode;
}

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();
  if (loading) {
    return (
      <View
        style={[
          styles.flexContainer,
          styles.scrollContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={[
          styles.flexContainer,
          styles.scrollContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <CustomText
          isError
          testID="error-text"
          style={{
            textAlign: 'center',
          }}
        >
          {LL.ERROR()}: {error.message}
        </CustomText>
      </View>
    );
  }
  if (!data) {
    return (
      <View
        style={[
          styles.flexContainer,
          styles.scrollContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <CustomText
          style={{
            textAlign: 'center',
          }}
        >
          {LL.NOTHING_TO_SHOW()}
        </CustomText>
      </View>
    );
  }
  return children;
};

export default QueryResult;
