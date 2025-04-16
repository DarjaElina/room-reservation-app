import { View } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';
import { useWindowDimensions } from 'react-native';
interface RoomProps {
  code: string;
  venue: string;
  pictureUrl?: string;
  isFree?: boolean | null;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Room({
  code,
  venue,
  pictureUrl = 'https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg',
  isFree,
}: RoomProps) {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const isExtraSmallScreen = width < 460;
  return (
    <View testID="room-item">
      <Image
        style={styles.roomItemImage}
        source={pictureUrl}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: isExtraSmallScreen ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <CustomText
            isBig
            style={{
              fontFamily: 'Nunito-Bold',
            }}
          >
            {code}
          </CustomText>
          <CustomText>{venue}</CustomText>
        </View>
        <View style={styles.iconTextContainer}>
          {isFree ? (
            <>
              <AntDesign name="checksquare" size={20} color={colors.success} />
              <CustomText
                style={{ display: isExtraSmallScreen ? 'none' : 'flex' }}
              >
                {LL.AVAILABLE()}
              </CustomText>
            </>
          ) : (
            <>
              <AntDesign name="closesquare" size={20} color={colors.error} />
              <CustomText
                style={{ display: isExtraSmallScreen ? 'none' : 'flex' }}
              >
                {LL.OCCUPIED()}
              </CustomText>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
