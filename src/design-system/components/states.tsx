import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies, fontSizes, radii, spacing } from '../tokens';
import { PrimaryButton } from './actions';

export function EmptyState({ title, message, actionLabel, onAction, icon }: { title: string; message: string; actionLabel?: string; onAction?: () => void; icon?: ReactNode }) {
  return <View style={styles.state} accessibilityLabel={`${title}. ${message}`}>{icon ?? <View style={styles.marker} />}<Text style={styles.title}>{title}</Text><Text style={styles.message}>{message}</Text>{actionLabel && onAction ? <PrimaryButton label={actionLabel} onPress={onAction} style={styles.action} /> : null}</View>;
}

export function ErrorState({ title = 'Something went wrong', message, actionLabel = 'Try again', onAction }: { title?: string; message: string; actionLabel?: string; onAction?: () => void }) {
  return <View style={styles.state} accessibilityLabel={`${title}. ${message}`}><View style={[styles.marker, styles.errorMarker]} /><Text style={styles.title}>{title}</Text><Text style={styles.message}>{message}</Text>{onAction ? <PrimaryButton label={actionLabel} onPress={onAction} style={styles.action} /> : null}</View>;
}

export function Skeleton({ width = '100%', height = 18 }: { width?: number | `${number}%`; height?: number }) {
  return <View accessible accessibilityLabel="Loading" style={[styles.skeleton, { width, height }]}><ActivityIndicator color={colors.quiet} /></View>;
}

export function Toast({ message, visible = true }: { message: string; visible?: boolean }) {
  if (!visible) return null;
  return <View accessibilityLiveRegion="polite" accessibilityRole="alert" style={styles.toast}><Text style={styles.toastText}>{message}</Text></View>;
}

const styles = StyleSheet.create({
  state: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.section, paddingHorizontal: spacing.lg },
  marker: { width: 44, height: 44, borderRadius: radii.pill, backgroundColor: colors.surfaceSoft, borderWidth: 1, borderColor: colors.lime, marginBottom: spacing.lg },
  errorMarker: { borderColor: colors.coral },
  title: { color: colors.ink, fontFamily: fontFamilies.displayMedium, fontSize: fontSizes.bodyLarge, textAlign: 'center' },
  message: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.body, lineHeight: 22, textAlign: 'center', marginTop: spacing.sm },
  action: { marginTop: spacing.lg, minWidth: 140 },
  skeleton: { borderRadius: radii.sm, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
  toast: { position: 'absolute', bottom: spacing.xl, left: spacing.lg, right: spacing.lg, borderRadius: radii.md, backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.borderStrong, padding: spacing.md },
  toastText: { color: colors.ink, fontFamily: fontFamilies.body, fontSize: fontSizes.body },
});
