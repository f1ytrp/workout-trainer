import { useState } from 'react';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MainTabParamList, QuickAction } from '../types/navigation';
import { FloatingActionOrb, colors, fontFamilies, fontSizes, radii, shadows, spacing } from '../design-system';
import { TodayScreen } from '../features/today/TodayScreen';
import { TrainingScreen } from '../features/training/TrainingScreen';
import { NutritionScreen } from '../features/nutrition/NutritionScreen';
import { ProgressScreen } from '../features/progress/ProgressScreen';
import { QuickActionSheet } from './QuickActionSheet';

const Tab = createBottomTabNavigator<MainTabParamList>();

function KineticTabBar({ state, descriptors, navigation, onOrbPress }: BottomTabBarProps & { onOrbPress: () => void }) {
  const insets = useSafeAreaInsets();
  const iconNames: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = { Today: 'sunny-outline', Train: 'barbell-outline', Nutrition: 'restaurant-outline', Progress: 'analytics-outline' };
  const renderTab = (route: (typeof state.routes)[number], index: number) => {
    const focused = state.index === index;
    const label = descriptors[route.key].options.tabBarLabel?.toString() ?? route.name;
    const icon = iconNames[route.name as keyof MainTabParamList];
    return <Pressable key={route.key} onPress={() => navigation.navigate(route.name)} accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: focused }} style={styles.tab}><Ionicons name={icon} size={22} color={focused ? colors.lime : colors.quiet} /><Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>{label}</Text></Pressable>;
  };
  return <View style={[styles.tabBar, { bottom: Math.max(insets.bottom, spacing.sm) }]}>{state.routes.slice(0, 2).map(renderTab)}<View key="orb-slot" style={styles.orbSlot}><FloatingActionOrb onPress={onOrbPress} /></View>{state.routes.slice(2).map((route, index) => renderTab(route, index + 2))}</View>;
}

export function MainTabNavigator() {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [lastAction, setLastAction] = useState<QuickAction | undefined>();
  return <><Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <KineticTabBar {...props} onOrbPress={() => setSheetVisible(true)} />}>
    <Tab.Screen name="Today" component={TodayScreen} />
    <Tab.Screen name="Train" component={TrainingScreen} />
    <Tab.Screen name="Nutrition" component={NutritionScreen} />
    <Tab.Screen name="Progress" component={ProgressScreen} />
  </Tab.Navigator><QuickActionSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} onAction={setLastAction} />{lastAction ? <View accessible accessibilityRole="alert" style={styles.actionNotice}><Text style={styles.noticeText}>{lastAction} is ready for a later phase.</Text></View> : null}</>;
}

const styles = StyleSheet.create({
  tabBar: { position: 'absolute', left: spacing.md, right: spacing.md, minHeight: 76, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: spacing.xs, ...shadows.card },
  tab: { minWidth: 60, minHeight: spacing.minimumTouchTarget, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { color: colors.quiet, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.micro },
  activeTabLabel: { color: colors.lime },
  orbSlot: { minWidth: 70, minHeight: 90, alignItems: 'center', justifyContent: 'center', marginTop: -24 },
  actionNotice: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: 110, padding: spacing.md, borderRadius: radii.md, borderWidth: 1, borderColor: colors.lime, backgroundColor: colors.surfaceRaised },
  noticeText: { color: colors.ink, fontFamily: fontFamilies.body, fontSize: fontSizes.body },
});
