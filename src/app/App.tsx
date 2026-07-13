import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { AppErrorBoundary } from './AppErrorBoundary';
import { RootNavigator } from '../navigation';
import { colors } from '../design-system';

const navigationTheme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.canvas, card: colors.surface, text: colors.ink, border: colors.border, primary: colors.lime } };

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    'DMSans-Regular': require('../../assets/fonts/DM-sans/DMSans_24pt-Regular.ttf'),
    'DMSans-Medium': require('../../assets/fonts/DM-sans/DMSans_24pt-Medium.ttf'),
    'DMSans-Bold': require('../../assets/fonts/DM-sans/DMSans_24pt-Bold.ttf'),
  });
  if (!fontsLoaded && !fontError) return <SafeAreaProvider><View style={styles.loading}><ActivityIndicator color={colors.lime} /><Text style={styles.loadingText}>Preparing your space</Text></View></SafeAreaProvider>;
  return <SafeAreaProvider><AppErrorBoundary><View style={styles.root}><StatusBar barStyle="light-content" backgroundColor={colors.canvas} /><NavigationContainer theme={navigationTheme}><RootNavigator /></NavigationContainer></View></AppErrorBoundary></SafeAreaProvider>;
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.canvas }, loading: { flex: 1, backgroundColor: colors.canvas, justifyContent: 'center', alignItems: 'center', gap: 12 }, loadingText: { color: colors.muted, fontFamily: 'DMSans-Regular', fontSize: 15 } });
