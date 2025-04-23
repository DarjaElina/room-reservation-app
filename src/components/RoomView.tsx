import { View, Modal, ScrollView } from 'react-native';
import RoomDescription from './RoomDescription';
import { Image } from 'expo-image';
import EquipmentList from './EquipmentList';
import useAuth from '@/src/hooks/useAuth';
import BookingList from './BookingList';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { BookingStatus, RoomType } from '@/__generated__/graphql';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import { useWindowDimensions } from 'react-native';
import useFavoriteRoom from '../hooks/useFavoriteRoom';
import LoadingOverlay from './LoadingOverlay';

interface RoomViewProps {
  room: {
    __typename?: 'Room';
    id: string;
    isFree?: boolean | null;
    code: string;
    pictureUrl?: string | null;
    isBookable: boolean;
    size: number;
    description: string;
    equipment: {
      __typename?: 'Equipment';
      name: string;
      id: string;
    }[];
    venue: {
      __typename?: 'Venue';
      name: string;
    };
    type: RoomType;
    isFavorite?: boolean | null;
  };
}

export default function RoomView({ room }: RoomViewProps) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const { LL } = useI18nContext();
  const { toggleFavoriteRoom, loading } = useFavoriteRoom({
    roomId: room.id,
  });
  const formatRoomType = (type: string) => {
    return type
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/^./, (str) => str.toUpperCase());
  };
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const handleAddToFavorite = async () => {
    await toggleFavoriteRoom();
  };

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <View
      style={[
        styles.flexContainer,
        { width: isLargeScreen ? '80%' : '100%', alignSelf: 'center' },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={[{ backgroundColor: colors.background }]}
      >
        <Image
          style={styles.roomViewImage}
          source={
            room.pictureUrl ??
            'https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg'
          }
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View>
          <View style={[styles.headerContainer]}>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 15,
                maxWidth: '60%',
              }}
            >
              <CustomText fontFamily="Nunito-Bold" isBig>
                {room.code}
              </CustomText>
              <CustomText>{formatRoomType(room.type)}</CustomText>
              <CustomText isSmall>{room.venue.name}</CustomText>
              {room.isFree ? (
                <View style={styles.iconTextContainer}>
                  <AntDesign
                    name="checksquare"
                    size={20}
                    color={colors.success}
                  />
                  <CustomText>{LL.AVAILABLE()}</CustomText>
                </View>
              ) : (
                <View style={styles.iconTextContainer}>
                  <AntDesign
                    name="closesquare"
                    size={20}
                    color={colors.error}
                  />
                  <CustomText>{LL.OCCUPIED()}</CustomText>
                </View>
              )}
              <CustomText
                onPress={() => setModalVisible(true)}
                style={{ textDecorationLine: 'underline' }}
              >
                {LL.SHOW_UPCOMING_RESERVATIONS()}
              </CustomText>
            </View>
            <View>
              <CustomButton
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(home)/rooms/[id]/create-booking',
                    params: { id: room.id },
                  })
                }
                label={LL.RESERVE()}
                style={{ margin: 0, alignSelf: 'flex-start', marginBottom: 5 }}
              />
              <CustomButton
                onPress={handleAddToFavorite}
                label={room.isFavorite ? 'Favorited 🎵' : 'Add to Favorites'}
                style={{
                  margin: 0,
                  alignSelf: 'flex-start',
                }}
                variant={room.isFavorite ? 'favoriteActive' : 'favorite'}
              />
            </View>
          </View>
          <EquipmentList equipment={room.equipment} />
          <RoomDescription text={room.description} />

          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: colors.background },
              ]}
            >
              <BookingList
                queryOptions={{
                  roomId: room.id,
                  userId: user?.id,
                  status: BookingStatus.Active,
                }}
                emptyMessage={LL.NO_UPCOMING_BOOKINGS()}
              />
              <CustomButton
                onPress={() => setModalVisible(false)}
                label={LL.CLOSE()}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}
