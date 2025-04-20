import { FlatList } from 'react-native';
import RoomItem from '../RoomItem';
import useStyles from '@/src/hooks/useStyles';
import CustomText from '../CustomText';
import { useRouter } from 'expo-router';
import PressableCard from '../PressableCard';

interface RoomListProps {
  rooms: {
    __typename?: 'Room';
    code: string;
    id: string;
    isFree?: boolean | null;
    pictureUrl?: string | null;
    size: number;
    description: string;
    equipment?:
      | ({
          __typename?: 'Equipment';
          name: string;
          id: string;
        } | null)[]
      | null;
    venue: {
      __typename?: 'Venue';
      name: string;
    };
  }[];
  onEndReach: ((info: { distanceFromEnd: number }) => void) | null | undefined;
}

export default function RoomListContainer({
  rooms,
  onEndReach,
}: RoomListProps) {
  const styles = useStyles();
  const router = useRouter();
  if (rooms.length === 0) {
    return <CustomText style={styles.userMessage}>No rooms found.</CustomText>;
  }
  return (
    <FlatList
      contentContainerStyle={[styles.listContainer]}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      numColumns={2}
      data={rooms}
      renderItem={({ item }) =>
        item ? (
          <PressableCard
            testID="room-item-link"
            key={item.id}
            onPress={() =>
              router.push({ pathname: '/rooms/[id]', params: { id: item.id } })
            }
          >
            <RoomItem
              code={item.code}
              venue={item.venue.name}
              isFree={item.isFree}
              pictureUrl={item.pictureUrl}
            />
          </PressableCard>
        ) : null
      }
      keyExtractor={(item) => item.id}
    />
  );
}
