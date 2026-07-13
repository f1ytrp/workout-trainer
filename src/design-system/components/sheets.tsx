import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useBottomSheetMotion } from '../motion';
import { colors, fontFamilies, fontSizes, radii, spacing } from '../tokens';
import { PrimaryButton, SecondaryButton } from './actions';

export function BottomSheet({ visible, title, onClose, children }: { visible: boolean; title: string; onClose: () => void; children: ReactNode }) {
  const { animatedStyle, backdropStyle } = useBottomSheetMotion(visible);
  return <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} accessibilityViewIsModal>
    <View style={styles.modal}><Animated.View style={[styles.backdrop, backdropStyle]}><Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close sheet" /></Animated.View><Animated.View style={[styles.sheet, animatedStyle]}><View style={styles.handle} /><View style={styles.header}><Text style={styles.title}>{title}</Text><Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close sheet" style={styles.close}><Text style={styles.closeLabel}>Close</Text></Pressable></View>{children}</Animated.View></View>
  </Modal>;
}

export function ConfirmationSheet({ visible, title, message, confirmLabel = 'Confirm', onClose, onConfirm }: { visible: boolean; title: string; message: string; confirmLabel?: string; onClose: () => void; onConfirm: () => void }) {
  return <BottomSheet visible={visible} title={title} onClose={onClose}><Text style={styles.message}>{message}</Text><PrimaryButton label={confirmLabel} onPress={onConfirm} style={styles.button} /><SecondaryButton label="Cancel" onPress={onClose} style={styles.button} /></BottomSheet>;
}

const styles = StyleSheet.create({
  modal: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  sheet: { backgroundColor: colors.surface, borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, paddingBottom: spacing.xxl },
  handle: { alignSelf: 'center', width: 44, height: 4, borderRadius: radii.pill, backgroundColor: colors.borderStrong, marginBottom: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  title: { color: colors.ink, fontFamily: fontFamilies.display, fontSize: fontSizes.title },
  close: { minHeight: spacing.minimumTouchTarget, justifyContent: 'center', paddingHorizontal: spacing.xs },
  closeLabel: { color: colors.lime, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.caption },
  message: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.body, lineHeight: 22, marginBottom: spacing.lg },
  button: { marginTop: spacing.sm },
});
