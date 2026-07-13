import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppScrollView, BottomSheet, Chip, CornerBrackets, EmptyState, ErrorState, FloatingActionOrb, FormField, GlassSurface, HeatCell, IconButton, KineticCardFrame, MetricValue, NumericField, PrimaryButton, ProgressArc, ProgressBar, SecondaryButton, SectionHeader, SegmentedControl, SignalTrace, Skeleton, Surface, TextButton, Toast, colors, fontFamilies, fontSizes, spacing, useReducedMotionPreference } from '../../design-system';

export const designGalleryEnabled = typeof __DEV__ !== 'undefined' && __DEV__;

export function DesignGalleryScreen() {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [segment, setSegment] = useState<'One' | 'Two'>('One');
  const [number, setNumber] = useState('');
  const reducedMotion = useReducedMotionPreference();
  if (!designGalleryEnabled) return <ErrorState title="Gallery unavailable" message="The design gallery is only available in development builds." />;
  return <AppScrollView><Text style={styles.title}>Design Gallery</Text><Text style={styles.intro}>A living reference for the Kinetic Trace foundation.</Text>
    <SectionHeader title="Buttons" /><View style={styles.stack}><PrimaryButton label="Primary action" onPress={() => undefined} /><SecondaryButton label="Secondary action" onPress={() => undefined} /><PrimaryButton label="Loading action" loading onPress={() => undefined} /><SecondaryButton label="Disabled action" disabled onPress={() => undefined} /><TextButton label="Text action" onPress={() => undefined} /><IconButton accessibilityLabel="Gallery icon action" onPress={() => undefined}><Text style={styles.icon}>⌁</Text></IconButton><FloatingActionOrb onPress={() => setSheetVisible(true)} /></View>
    <SectionHeader title="Surfaces" /><View style={styles.stack}><Surface><Text style={styles.body}>Solid surface for dense interfaces.</Text></Surface><GlassSurface><Text style={styles.body}>Selective glass surface for emphasis.</Text></GlassSurface><KineticCardFrame><Text style={styles.body}>Kinetic card frame</Text></KineticCardFrame></View>
    <SectionHeader title="Typography" /><Text style={styles.eyebrow}>KINETIC TRACE / MICRO LABEL</Text><Text style={styles.display}>Make the signal legible.</Text><Text style={styles.body}>DMSans keeps utility copy calm and readable while Montserrat marks important moments.</Text>
    <SectionHeader title="Progress" /><View style={styles.row}><MetricValue value="72%" label="Metric value" /><ProgressArc progress={0.72} /><View style={styles.progressWrap}><ProgressBar progress={0.72} /><HeatCell level={3} label="Progress heat cell" /></View></View>
    <SectionHeader title="SVG motifs" /><KineticCardFrame><SignalTrace /><CornerBrackets /></KineticCardFrame>
    <SectionHeader title="Empty and error states" /><EmptyState title="Nothing here yet" message="A real empty state leaves room for a meaningful next step." actionLabel="Primary action" onAction={() => undefined} /><ErrorState message="The gallery error state stays clear and recoverable." onAction={() => undefined} />
    <SectionHeader title="Forms and selections" /><SegmentedControl options={['One', 'Two'] as const} value={segment} onChange={setSegment} /><View style={styles.chips}><Chip label="Selected" selected onPress={() => undefined} /><Chip label="Available" onPress={() => undefined} /></View><FormField label="Example field" helperText="Helper copy stays nearby."><Text style={styles.fakeInput}>A typed field shell</Text></FormField><NumericField label="Numeric field" value={number} onChangeText={setNumber} helperText="Numbers are explicit, not inferred." />
    <SectionHeader title="Bottom sheet" /><PrimaryButton label="Open bottom sheet" onPress={() => setSheetVisible(true)} /><BottomSheet visible={sheetVisible} title="Gallery sheet" onClose={() => setSheetVisible(false)}><Text style={styles.body}>Sheets keep actions close without taking over the whole screen.</Text><SecondaryButton label="Close" onPress={() => setSheetVisible(false)} style={styles.sheetButton} /></BottomSheet>
    <SectionHeader title="Reduced motion" /><Toast message={reducedMotion ? 'Reduced motion is active.' : 'Standard motion is active.'} /><Skeleton width="80%" height={24} />
  </AppScrollView>;
}

const styles = StyleSheet.create({
  title: { color: colors.ink, fontFamily: fontFamilies.display, fontSize: fontSizes.display, marginBottom: spacing.xs },
  intro: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.bodyLarge, lineHeight: 25, marginBottom: spacing.xl },
  stack: { gap: spacing.sm, marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginBottom: spacing.lg },
  progressWrap: { flex: 1, gap: spacing.md },
  chips: { flexDirection: 'row', gap: spacing.sm, marginVertical: spacing.md },
  eyebrow: { color: colors.lime, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.micro, letterSpacing: 1.4, marginBottom: spacing.sm },
  display: { color: colors.ink, fontFamily: fontFamilies.display, fontSize: fontSizes.title, marginBottom: spacing.sm },
  body: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.body, lineHeight: 22 },
  icon: { color: colors.lime, fontSize: 24 },
  fakeInput: { minHeight: spacing.minimumTouchTarget, borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surfaceRaised, color: colors.ink, padding: spacing.md, fontFamily: fontFamilies.body },
  sheetButton: { marginTop: spacing.lg },
});
