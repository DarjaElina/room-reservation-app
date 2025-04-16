import { ScrollView } from 'react-native';
import RoomItem from '../RoomItem';
import useStyles from '@/src/hooks/useStyles';
import CustomText from '../CustomText';
import { NativeScrollEvent } from 'react-native';
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
  fetchMore: () => void;
}

export default function RoomListContainerWeb({
  rooms,
  fetchMore,
}: RoomListProps) {
  const styles = useStyles();
  const router = useRouter();

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  if (rooms.length === 0) {
    return <CustomText style={styles.userMessage}>No rooms found.</CustomText>;
  }
  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          fetchMore();
        }
      }}
      scrollEventThrottle={400}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      {rooms.map((item) => (
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
          />
        </PressableCard>
      ))}
    </ScrollView>
  );
}
