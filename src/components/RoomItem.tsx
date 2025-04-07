import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import { useColorScheme } from 'react-native';

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
  const colorScheme = useColorScheme();
  return (
    <View
      testID="room-item"
      style={[
        styles.itemContainer,
        {
          boxShadow:
            colorScheme === 'light' ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : '',
          backgroundColor: colors.card,
        },
      ]}
    >
      <Image
        style={styles.roomItemImage}
        source={pictureUrl}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text
        style={[
          styles.bigText,
          styles.boldText,
          {
            color: colors.text,
          },
        ]}
      >
        {code}
      </Text>
      <Text
        style={[
          styles.mediumText,
          {
            color: colors.text,
          },
        ]}
      >
        {venue}
      </Text>
      <View style={styles.iconTextContainer}>
        {isFree ? (
          <>
            <AntDesign name="checksquare" size={20} color={colors.success} />
            <Text
              style={[
                styles.mediumText,
                {
                  color: colors.text,
                },
              ]}
            >
              {LL.AVAILABLE()}
            </Text>
          </>
        ) : (
          <>
            <AntDesign name="closesquare" size={20} color={colors.error} />
            <Text
              style={[
                styles.mediumText,
                {
                  color: colors.text,
                },
              ]}
            >
              {LL.OCCUPIED()}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
