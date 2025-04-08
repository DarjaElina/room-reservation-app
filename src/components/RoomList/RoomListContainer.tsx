import { FlatList } from 'react-native';
import RoomItem from '../RoomItem';
import { Link } from 'expo-router';
import useStyles from '@/src/hooks/useStyles';
import CustomText from '../CustomText';

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
  return rooms.length > 0 ? (
    <FlatList
      contentContainerStyle={[
        styles.listContainer,
        { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
      ]}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      data={rooms}
      renderItem={({ item }) =>
        item ? (
          <Link
            testID="room-item-link"
            style={[styles.roomLinkContainer]}
            href={{
              pathname: '/rooms/[id]',
              params: { id: item.id },
            }}
          >
            <RoomItem
              code={item.code}
              venue={item.venue.name}
              isFree={item.isFree}
            />
          </Link>
        ) : null
      }
      keyExtractor={(item) => item.id}
    />
  ) : (
    <CustomText style={styles.userMessage}>No rooms found.</CustomText>
  );
}
