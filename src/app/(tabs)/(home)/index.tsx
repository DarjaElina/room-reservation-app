import { View, StyleSheet } from 'react-native';
import RoomList from '@/src/components/RoomList';
import { useTheme } from '@react-navigation/native';

export default function Index() {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <RoomList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
