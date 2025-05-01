import { Platform, View, Switch } from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useRooms from '@/src/hooks/useRooms';
import RoomListContainer from './RoomListContainer';
import RoomListContainerWeb from './RoomListContainerWeb';
import SearchBar from '../SearchBar';
import FilterButtons from '../FilterButtons';
import useFilter from '@/src/hooks/useFilter';
import { PaperProvider } from 'react-native-paper';
import QueryResult from '../QueryResult';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';
import CustomText from '../CustomText';
import { useTheme } from '@react-navigation/native';
import WebSwitch from 'react-switch';
export default function RoomListWrapper() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 2000);
  const {
    startDate,
    endDate,
    buildings,
    equipment,
    types,
    showFavorites,
    setShowFavorites,
  } = useFilter();

  const { rooms, loading, error, fetchMore } = useRooms({
    first: 8,
    searchKeyword: debouncedSearchQuery,
    startsAt: startDate?.getTime() ?? undefined,
    endsAt: endDate?.getTime() ?? undefined,
    venueIds: buildings,
    equipmentIds: equipment,
    roomTypes: types,
    showFavorites,
  });
  const { LL } = useI18nContext();
  const styles = useStyles();
  const onEndReach = () => {
    fetchMore();
  };
  const { colors } = useTheme();

  const toggleSwitch = () => {
    setShowFavorites(!showFavorites);
  };

  const roomNodes = rooms.edges ? rooms.edges.map((edge) => edge?.node) : [];

  return (
    <PaperProvider>
      <QueryResult loading={loading} error={error} data={rooms}>
        <View style={[styles.scrollContainer, styles.flexContainer]}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={LL.SEARCH_ROOMS_BY_CODE()}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          ></View>
          <FilterButtons />

          {Platform.OS === 'web' ? (
            <View style={styles.switch}>
              <CustomText>{LL.SHOW_FAVORITES()}</CustomText>
              <WebSwitch
                offColor="#c7c4bf"
                onColor={colors.primary}
                onChange={toggleSwitch}
                checked={showFavorites}
                checkedIcon={false}
                uncheckedIcon={false}
                height={24}
                handleDiameter={20}
                width={50}
              />
            </View>
          ) : (
            <View style={styles.switch}>
              <CustomText isBig>{LL.SHOW_FAVORITES()}</CustomText>
              <Switch
                trackColor={{
                  false: colors.borderLight,
                  true: colors.primary,
                }}
                thumbColor="#ffffff"
                ios_backgroundColor={colors.borderLight}
                onValueChange={toggleSwitch}
                value={showFavorites}
              />
            </View>
          )}
          {Platform.OS === 'web' ? (
            <RoomListContainerWeb rooms={roomNodes} fetchMore={fetchMore} />
          ) : (
            <RoomListContainer rooms={roomNodes} onEndReach={onEndReach} />
          )}
        </View>
      </QueryResult>
    </PaperProvider>
  );
}
