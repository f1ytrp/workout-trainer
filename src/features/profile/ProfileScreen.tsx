import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../../types/navigation';
import { AppScrollView, IconButton, KineticCardFrame, SectionHeader, colors, fontFamilies, fontSizes, spacing } from '../../design-system';

export function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return <AppScrollView><View style={styles.header}><IconButton accessibilityLabel="Go back" onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={22} color={colors.ink} /></IconButton><Text style={styles.title}>Profile</Text><View style={styles.spacer} /></View><KineticCardFrame><Text style={styles.eyebrow}>PROFILE SPACE</Text><Text style={styles.cardTitle}>Your details, when you are ready.</Text><Text style={styles.copy}>This Phase 1 shell does not invent identity, goals, or measurements. Later screens will make every field explicit.</Text></KineticCardFrame><SectionHeader title="Preferences" /><KineticCardFrame><Text style={styles.copy}>Notification, accessibility, and data controls will live here in a later phase.</Text></KineticCardFrame></AppScrollView>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl },
  title: { color: colors.ink, fontFamily: fontFamilies.display, fontSize: fontSizes.title },
  spacer: { width: spacing.minimumTouchTarget },
  eyebrow: { color: colors.lime, fontFamily: fontFamilies.bodyStrong, fontSize: fontSizes.micro, letterSpacing: 1.2, marginBottom: spacing.md },
  cardTitle: { color: colors.ink, fontFamily: fontFamilies.displayMedium, fontSize: fontSizes.bodyLarge, marginBottom: spacing.sm },
  copy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: fontSizes.body, lineHeight: 22 },
});
