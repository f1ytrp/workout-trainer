import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radii, spacing } from '../tokens';
import { CornerBrackets } from '../svg/CornerBrackets';
import { KineticCard } from './layout';

export function KineticCardFrame({ children, style, onPress }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  return <KineticCard interactive={Boolean(onPress)} onPress={onPress} style={[styles.card, style]}><View pointerEvents="none" style={StyleSheet.absoluteFill}><CornerBrackets color={colors.borderStrong} /></View>{children}</KineticCard>;
}

const styles = StyleSheet.create({ card: { minHeight: 120, borderRadius: radii.lg, padding: spacing.lg } });
