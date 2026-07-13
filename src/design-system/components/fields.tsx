import type { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fontFamilies, fontSizes, radii, spacing } from '../tokens';

export function FormField({ label, helperText, error, children, style }: { label: string; helperText?: string; error?: string; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <FormFieldShell label={label} helperText={helperText} error={error} style={style}>{children}</FormFieldShell>;
}

function FormFieldShell({ label, helperText, error, children, style }: { label: string; helperText?: string; error?: string; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.field, style]}><Text style={styles.label}>{label}</Text>{children}<Text style={error ? styles.error : styles.helper}>{error ?? helperText ?? ' '}</Text></View>;
}

export function NumericField({ label, value, onChangeText, helperText, error, ...props }: TextInputProps & { label: string; helperText?: string; error?: string }) {
  return <FormFieldShell label={label} helperText={helperText} error={error}><TextInput {...props} value={value} onChangeText={onChangeText} keyboardType="decimal-pad" accessibilityLabel={props.accessibilityLabel ?? label} style={styles.input} /></FormFieldShell>;
}

const styles = StyleSheet.create({
  field: { color: colors.ink, fontFamily: fontFamilies.body, fontSize: fontSizes.body, marginBottom: spacing.md },
  label: { color: colors.muted, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.caption, marginBottom: spacing.xs },
  input: { minHeight: spacing.minimumTouchTarget, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, backgroundColor: colors.surfaceRaised, color: colors.ink, paddingHorizontal: spacing.md, fontFamily: fontFamilies.body, fontSize: fontSizes.body },
  helper: { color: colors.quiet, fontFamily: fontFamilies.body, fontSize: fontSizes.micro, marginTop: spacing.xs },
  error: { color: colors.coral, fontFamily: fontFamilies.body, fontSize: fontSizes.micro, marginTop: spacing.xs },
});
