import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type PressableProps, type ScrollViewProps, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { usePressScale } from '../motion';
import { colors, radii, shadows, spacing } from '../tokens';

export function AppScreen({ children, style, edges = ['top', 'left', 'right'], ...props }: ViewProps & { children: ReactNode; edges?: Edge[] }) {
  return <SafeAreaView edges={edges} style={[styles.screen, style]} {...props}>{children}</SafeAreaView>;
}

export function AppScrollView({ children, style, contentContainerStyle, ...props }: ScrollViewProps & { children: ReactNode }) {
  return <ScrollView style={[styles.screen, style]} contentContainerStyle={[styles.scrollContent, contentContainerStyle]} {...props}>{children}</ScrollView>;
}

export function Surface({ children, style, tone = 'default', ...props }: ViewProps & { children: ReactNode; tone?: 'default' | 'raised' | 'soft' }) {
  const backgroundColor = tone === 'raised' ? colors.surfaceRaised : tone === 'soft' ? colors.surfaceSoft : colors.surface;
  return <View style={[styles.surface, { backgroundColor }, style]} {...props}>{children}</View>;
}

export function GlassSurface({ children, style, ...props }: ViewProps & { children: ReactNode }) {
  return <View style={[styles.glass, style]} {...props}>{children}</View>;
}

export function KineticCard({ children, style, interactive = false, onPress, ...props }: Omit<PressableProps, 'style' | 'children'> & { children: ReactNode; style?: StyleProp<ViewStyle>; interactive?: boolean }) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale();
  if (!interactive && !onPress) return <Surface style={style}>{children}</Surface>;
  return <Animated.View style={animatedStyle}><Surface style={style}><Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} accessibilityRole="button" {...props}>{children}</Pressable></Surface></Animated.View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  scrollContent: { padding: spacing.lg, paddingBottom: spacing.section * 2 },
  surface: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.lg, borderWidth: 1, padding: spacing.lg },
  glass: { backgroundColor: colors.glass, borderColor: colors.border, borderRadius: radii.lg, borderWidth: 1, padding: spacing.lg, ...shadows.card },
});
