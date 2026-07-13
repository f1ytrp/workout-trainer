import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import type { MainTabParamList, RootStackParamList } from '../../types/navigation';
import { AppScrollView, IconButton, KineticCardFrame, MetricValue, ProgressBar, SectionHeader, SignalTrace, colors, fontFamilies, fontSizes, spacing } from '../../design-system';

export function PhasePlaceholder({ eyebrow, title, description, accent = colors.lime }: { eyebrow: string; title: string; description: string; accent?: string }) {
  const navigation = useNavigation<NavigationProp<MainTabParamList>>();
  const profileNavigation = navigation.getParent<NavigationProp<RootStackParamList>>();
  return <AppScrollView>
    <View style={styles.header}><View><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.title}>{title}</Text></View><IconButton accessibilityLabel="Open profile" onPress={() => profileNavigation?.navigate('Profile')}><Ionicons name="person-outline" size={22} color={colors.ink} /></IconButton></View>
    <KineticCardFrame style={styles.hero}><Text style={[styles.signalLabel, { color: accent }]}>PHASE 1 FOUNDATION</Text><SignalTrace color={accent} width={280} /><Text style={styles.description}>{description}</Text></KineticCardFrame>
    <SectionHeader title="Ready for the next layer" />
    <View style={styles.metrics}><MetricValue value="—" label="Confirmed records" accent={accent} /><MetricValue value="0" label="Offline actions" accent={colors.cyan} /><MetricValue value="∞" label="Room to build" accent={colors.amber} /></View>
    <KineticCardFrame><Text style={styles.cardTitle}>A calm place to start</Text><Text style={styles.cardCopy}>This shell is intentionally free of invented fitness records. Later phases will connect real local-first data here.</Text><ProgressBar progress={0} color={accent} /></KineticCardFrame>
  </AppScrollView>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl },
  eyebrow: { color: colors.quiet, fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.micro, letterSpacing: 1.4, textTransform: 'uppercase' },
  title: { color: colors.ink, fontFamily: fontFamilies.display, fontSize: fontSizes.display, marginTop: spacing.xs },
  hero: { marginBottom: spacing.xl, overflow: 'hidden' },
  signalLabel: { fontFamily: fontFamilies.bodyStrong, fontSize: fontSizes.micro, letterSpacing: 1.2, marginBottom: spacing.sm },
  description: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.bodyLarge, lineHeight: 25, marginTop: spacing.md },
  metrics: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  cardTitle: { color: colors.ink, fontFamily: fontFamilies.displayMedium, fontSize: fontSizes.bodyLarge, marginBottom: spacing.sm },
  cardCopy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.body, lineHeight: 22, marginBottom: spacing.lg },
});
