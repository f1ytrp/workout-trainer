import { useCallback } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { motion } from '../tokens';
import { useReducedMotionPreference } from './useReducedMotionPreference';

export function usePressScale(reducedMotionOverride?: boolean) {
  const reducedMotion = useReducedMotionPreference(reducedMotionOverride);
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const onPressIn = useCallback(() => { if (!reducedMotion) scale.value = withSpring(0.97, motion.springs.press); }, [reducedMotion, scale]);
  const onPressOut = useCallback(() => { if (!reducedMotion) scale.value = withSpring(1, motion.springs.press); }, [reducedMotion, scale]);
  return { animatedStyle, onPressIn, onPressOut, reducedMotion };
}
