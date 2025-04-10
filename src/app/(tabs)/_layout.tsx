import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '@/src/graphql/queries';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useI18nContext } from '@/src/i18n/i18n-react';
import LoadingOverlay from '@/src/components/LoadingOverlay';

export default function TabLayout() {
  const { loading, data } = useQuery(CURRENT_USER);
  const { LL } = useI18nContext();
  if (loading) {
    return <LoadingOverlay />;
  }
  if (!data?.currentUser) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: LL.SEARCH_TAB(),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'grid-sharp' : 'grid-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: LL.MY_CALENDAR(),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar-sharp' : 'calendar-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: LL.SETTINGS(),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'settings-sharp' : 'settings-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
