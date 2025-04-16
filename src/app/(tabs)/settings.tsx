import { useCallback, useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useSignOut from '@/src/hooks/useSignOut';
import { useI18nContext } from '@/src/i18n/i18n-react';
import { locales } from '@/src/i18n/i18n-util';
import { setUserLocale } from '@/src/utils/localeStorage';
import { loadLocaleAsync } from '@/src/i18n/i18n-util.async';
import LanguagePicker from '@/src/components/LanguagePicker';
import useStyles from '@/src/hooks/useStyles';
import { Locales } from '@/src/i18n/i18n-types';
import LoadingOverlay from '@/src/components/LoadingOverlay';
import CustomText from '@/src/components/CustomText';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '@/src/graphql/queries';
import { quotes } from '@/src/constants/Quotes';
import CustomButton from '@/src/components/CustomButton';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { signOut, loading } = useSignOut();
  const { LL, locale, setLocale } = useI18nContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [quote, setQuote] = useState('');
  const styles = useStyles();
  const { loading: userLoading, data } = useQuery(CURRENT_USER);

  const onLocaleSelected = useCallback(
    (locale: Locales) => {
      setUserLocale(locale)
        .then(async (locale) => {
          await loadLocaleAsync(locale);
          return locale;
        })
        .then(setLocale);
    },
    [setLocale]
  );

  useEffect(() => {
    const localeKey = locale.slice(0, 2) as keyof typeof quotes;
    const localizedQuotes = quotes[localeKey] || quotes.en;
    const randomIndex = Math.floor(Math.random() * localizedQuotes.length);
    setQuote(localizedQuotes[randomIndex]);
  }, [locale]);

  if (loading || userLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View
      style={[
        styles.flexContainer,
        styles.scrollContainer,
        styles.container,
        {
          backgroundColor: colors.background,
          justifyContent: 'space-evenly',
          alignSelf: 'center',
        },
      ]}
    >
      <CustomText style={[styles.bigText, { textAlign: 'center' }]}>
        {LL.HELLO()}, {data?.currentUser?.givenName}{' '}
        {data?.currentUser?.familyName}! ⭐️
      </CustomText>
      <View>
        <CustomButton
          onPress={() => setModalVisible(true)}
          label={LL.SELECT_LANGUAGE()}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={[styles.modalContainer, { backgroundColor: colors.card }]}
          >
            <LanguagePicker
              locale={locale}
              onLocaleSelected={onLocaleSelected}
              locales={locales}
            />
            <CustomButton
              onPress={() => setModalVisible(false)}
              label={LL.CLOSE()}
            />
          </View>
        </Modal>
        <CustomButton onPress={signOut} label={LL.LOGOUT()} />
      </View>
      <CustomText
        style={[
          styles.mediumText,
          {
            marginTop: 30,
            opacity: 0.8,
            textAlign: 'center',
          },
        ]}
      >
        {quote}
      </CustomText>
    </View>
  );
}
