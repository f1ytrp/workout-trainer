import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheet, colors, fontFamilies, fontSizes, spacing } from '../design-system';
import type { QuickAction } from '../types/navigation';

export const quickActions: readonly QuickAction[] = ['Start workout', 'Log food', 'Add water', 'Check in', 'Log bodyweight', 'Ask coach'];

export function QuickActionSheet({ visible, onClose, onAction }: { visible: boolean; onClose: () => void; onAction?: (action: QuickAction) => void }) {
  return <BottomSheet visible={visible} title="Quick actions" onClose={onClose}><Text style={styles.subtitle}>Choose a starting point. These actions will connect to real records in a later phase.</Text><View>{quickActions.map((action) => <Pressable key={action} onPress={() => { onAction?.(action); onClose(); }} accessibilityRole="button" accessibilityLabel={action} style={styles.action}><Text style={styles.actionLabel}>{action}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</View></BottomSheet>;
}

const styles = StyleSheet.create({
  subtitle: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.body, lineHeight: 22, marginBottom: spacing.md },
  action: { minHeight: spacing.minimumTouchTarget, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border },
  actionLabel: { color: colors.ink, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.body },
  arrow: { color: colors.lime, fontSize: 28 },
});
