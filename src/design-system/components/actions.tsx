import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useHapticAction, usePressScale } from '../motion';
import { colors, fontSizes, fontFamilies, radii, shadows, spacing } from '../tokens';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & { label: string; loading?: boolean; style?: StyleProp<ViewStyle> };

function ButtonBase({ label, loading = false, style, accessibilityLabel, ...props }: ButtonProps & { tone: 'primary' | 'secondary' }) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale();
  const haptic = useHapticAction(!props.disabled && !loading);
  return <Animated.View style={animatedStyle}>
    <Pressable
      {...props}
      onPress={(event) => { haptic(); props.onPress?.(event); }}
      onPressIn={(event) => { onPressIn(); props.onPressIn?.(event); }}
      onPressOut={(event) => { onPressOut(); props.onPressOut?.(event); }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: props.disabled || loading, busy: loading }}
      style={[styles.button, props.tone === 'primary' ? styles.primary : styles.secondary, style]}
      disabled={props.disabled || loading}
    >
      {loading ? <ActivityIndicator color={props.tone === 'primary' ? colors.canvas : colors.lime} /> : <Text style={props.tone === 'primary' ? styles.primaryLabel : styles.secondaryLabel}>{label}</Text>}
    </Pressable>
  </Animated.View>;
}

export function PrimaryButton(props: ButtonProps) { return <ButtonBase {...props} tone="primary" />; }
export function SecondaryButton(props: ButtonProps) { return <ButtonBase {...props} tone="secondary" />; }

export function TextButton({ label, style, accessibilityLabel, ...props }: ButtonProps) {
  return <Pressable {...props} accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? label} style={[styles.textButton, style]}>
    <Text style={styles.textLabel}>{label}</Text>
  </Pressable>;
}

export function IconButton({ children, accessibilityLabel, style, ...props }: Omit<PressableProps, 'children' | 'style'> & { children: ReactNode; accessibilityLabel: string; style?: StyleProp<ViewStyle> }) {
  return <Pressable {...props} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={[styles.iconButton, style]}>{children}</Pressable>;
}

export function FloatingActionOrb({ onPress, accessibilityLabel = 'Open quick actions' }: { onPress: () => void; accessibilityLabel?: string }) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale();
  return <Animated.View style={animatedStyle}><Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={styles.orb}><Text style={styles.orbLabel}>+</Text></Pressable></Animated.View>;
}

export function Chip({ label, selected = false, onPress, accessibilityLabel }: { label: string; selected?: boolean; onPress?: () => void; accessibilityLabel?: string }) {
  return <Pressable onPress={onPress} disabled={!onPress} accessibilityRole={onPress ? 'button' : undefined} accessibilityLabel={accessibilityLabel ?? label} accessibilityState={{ selected }} style={[styles.chip, selected && styles.selectedChip]}><Text style={[styles.chipLabel, selected && styles.selectedChipLabel]}>{label}</Text></Pressable>;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return <View style={styles.segmented}>{options.map((option) => <Pressable key={option} onPress={() => onChange(option)} accessibilityRole="button" accessibilityLabel={option} accessibilityState={{ selected: option === value }} style={[styles.segment, option === value && styles.activeSegment]}><Text style={[styles.segmentLabel, option === value && styles.activeSegmentLabel]}>{option}</Text></Pressable>)}</View>;
}

const styles = StyleSheet.create({
  button: { minHeight: spacing.minimumTouchTarget, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.lg },
  primary: { backgroundColor: colors.lime, ...shadows.orb },
  secondary: { backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.borderStrong },
  primaryLabel: { color: colors.canvas, fontFamily: fontFamilies.bodyStrong, fontSize: fontSizes.body },
  secondaryLabel: { color: colors.ink, fontFamily: fontFamilies.bodyStrong, fontSize: fontSizes.body },
  textButton: { minHeight: spacing.minimumTouchTarget, justifyContent: 'center', paddingHorizontal: spacing.xs },
  textLabel: { color: colors.lime, fontFamily: fontFamilies.bodyStrong, fontSize: fontSizes.body },
  iconButton: { minWidth: spacing.minimumTouchTarget, minHeight: spacing.minimumTouchTarget, borderRadius: radii.pill, justifyContent: 'center', alignItems: 'center' },
  orb: { width: 64, height: 64, borderRadius: radii.pill, backgroundColor: colors.lime, justifyContent: 'center', alignItems: 'center', ...shadows.orb },
  orbLabel: { color: colors.canvas, fontFamily: fontFamilies.display, fontSize: 32, lineHeight: 36 },
  chip: { minHeight: spacing.minimumTouchTarget, borderRadius: radii.pill, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  selectedChip: { backgroundColor: colors.lime, borderColor: colors.lime },
  chipLabel: { color: colors.muted, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.caption },
  selectedChipLabel: { color: colors.canvas },
  segmented: { flexDirection: 'row', backgroundColor: colors.surfaceRaised, borderRadius: radii.md, padding: spacing.xxs, gap: spacing.xxs },
  segment: { flex: 1, minHeight: spacing.minimumTouchTarget, borderRadius: radii.sm, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.sm },
  activeSegment: { backgroundColor: colors.surfaceSoft },
  segmentLabel: { color: colors.quiet, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.caption },
  activeSegmentLabel: { color: colors.ink },
});
