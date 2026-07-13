import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, fontFamilies, fontSizes, radii, spacing } from '../tokens';

export function MetricValue({ value, label, accent = colors.lime }: { value: string; label: string; accent?: string }) {
  return <View><Text style={[styles.metricValue, { color: accent }]}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View>;
}

export function clampProgress(value: number) { return Math.max(0, Math.min(1, value)); }

export function ProgressBar({ progress, color = colors.lime }: { progress: number; color?: string }) {
  return <View accessible accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 1, now: clampProgress(progress) }} style={styles.progressTrack}><View style={[styles.progressFill, { width: `${clampProgress(progress) * 100}%`, backgroundColor: color }]} /></View>;
}

export function ProgressArc({ progress, size = 96, color = colors.lime }: { progress: number; size?: number; color?: string }) {
  const safeProgress = clampProgress(progress);
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  return <View accessible accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 1, now: safeProgress }} style={{ width: size, height: size }}><Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><Circle cx={size / 2} cy={size / 2} r={radius} stroke={colors.border} strokeWidth={strokeWidth} fill="none" /><Circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={circumference * (1 - safeProgress)} rotation="-90" origin={`${size / 2}, ${size / 2}`} /></Svg></View>;
}

export function SectionHeader({ title, actionLabel, onAction }: { title: string; actionLabel?: string; onAction?: () => void }) {
  return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text>{actionLabel && onAction ? <Text onPress={onAction} accessibilityRole="button" accessibilityLabel={actionLabel} style={styles.action}>{actionLabel}</Text> : null}</View>;
}

export function HeatCell({ level = 0, label }: { level?: number; label?: string }) {
  const safeLevel = Math.max(0, Math.min(4, Math.round(level)));
  const palette = [colors.surfaceRaised, colors.border, colors.cyan, colors.limeStrong, colors.lime];
  return <View accessible accessibilityLabel={label ?? `Activity level ${safeLevel} of 4`} style={[styles.heatCell, { backgroundColor: palette[safeLevel] }]} />;
}

const styles = StyleSheet.create({
  metricValue: { fontFamily: fontFamilies.display, fontSize: fontSizes.title },
  metricLabel: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.caption, marginTop: spacing.xxs },
  progressTrack: { height: 8, overflow: 'hidden', borderRadius: radii.pill, backgroundColor: colors.surfaceRaised },
  progressFill: { height: '100%', borderRadius: radii.pill },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { color: colors.ink, fontFamily: fontFamilies.displayMedium, fontSize: fontSizes.bodyLarge },
  action: { color: colors.lime, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.caption, minHeight: spacing.minimumTouchTarget, textAlignVertical: 'center' },
  heatCell: { width: 18, height: 18, borderRadius: radii.sm },
});
