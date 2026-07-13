import Svg, { Path } from 'react-native-svg';
import { colors } from '../tokens';

export function CornerBrackets({ width = 180, height = 120, color = colors.borderStrong }: { width?: number; height?: number; color?: string }) {
  return <Svg width={width} height={height} viewBox="0 0 180 120" pointerEvents="none"><Path d="M18 34 V18 H42 M138 18 H162 V34 M18 86 V102 H42 M138 102 H162 V86" fill="none" stroke={color} strokeWidth="2" /></Svg>;
}
