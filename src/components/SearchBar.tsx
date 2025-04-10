import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import { useTheme } from '@react-navigation/native';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  const { LL } = useI18nContext();
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <View style={styles.inputContainer}>
      <Searchbar
        placeholder={LL.SEARCH()}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={[
          styles.searchbar,
          {
            backgroundColor: colors.card,
          },
        ]}
        inputStyle={{ minHeight: 0, color: colors.text }}
        placeholderTextColor={colors.text}
        iconColor={colors.text}
        cursorColor={colors.text}
      />
    </View>
  );
}
