import { useCallback, useState } from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
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

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { signOut, loading } = useSignOut();
  const { LL, locale, setLocale } = useI18nContext();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();

  const onLocaleSelected = useCallback((locale: Locales) => {
    setUserLocale(locale)
      .then(async (locale) => {
        await loadLocaleAsync(locale);
        return locale;
      })
      .then(setLocale);
  }, []);

  if (loading) {
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
          justifyContent: 'center',
          alignSelf: 'center',
        },
      ]}
    >
      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.mediumText]}>{LL.SELECT_LANGUAGE()}</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <LanguagePicker
            locale={locale}
            onLocaleSelected={onLocaleSelected}
            locales={locales}
          />

          <Pressable
            onPress={() => setModalVisible(false)}
            style={[
              styles.button,
              {
                backgroundColor: colors.primary,
                width: 100,
                alignSelf: 'center',
              },
            ]}
          >
            <Text style={[styles.buttonText]}>{LL.CLOSE()}</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: colors.primary, flexDirection: 'row' },
        ]}
        onPress={() => signOut()}
      >
        <Text style={[styles.mediumText]}>{LL.LOGOUT()}</Text>
      </Pressable>
    </View>
  );
}
