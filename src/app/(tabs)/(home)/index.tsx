import { View } from 'react-native';
import RoomList from '@/src/components/RoomList';
import { useTheme } from '@react-navigation/native';

export default function Index() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <RoomList />
    </View>
  );
}
