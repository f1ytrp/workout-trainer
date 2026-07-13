import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/navigation';
import { MainTabNavigator } from './MainTabNavigator';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { DesignGalleryScreen } from '../features/design-gallery/DesignGalleryScreen';
import { colors } from '../design-system';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isDevelopment = typeof __DEV__ !== 'undefined' && __DEV__;
  return <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: colors.canvas } }}><Stack.Screen name="MainTabs" component={MainTabNavigator} /><Stack.Screen name="Profile" component={ProfileScreen} />{isDevelopment ? <Stack.Screen name="DesignGallery" component={DesignGalleryScreen} /> : null}</Stack.Navigator>;
}
