import { View } from 'react-native';
import useStyles from '../hooks/useStyles';
import { useTheme } from '@react-navigation/native';

export default function Separator() {
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <View style={[styles.separator, { backgroundColor: colors.border }]}></View>
  );
}
