import Svg, { Path } from 'react-native-svg';
import { colors } from '../tokens';

export function SignalTrace({ width = 240, height = 72, color = colors.lime }: { width?: number; height?: number; color?: string }) {
  return <Svg width={width} height={height} viewBox="0 0 240 72" accessibilityLabel="Signal trace motif"><Path d="M2 45 C18 45 21 18 36 18 S55 58 72 58 86 30 101 30 121 49 137 49 151 12 168 12 189 55 206 55 218 37 238 37" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" /></Svg>;
}
