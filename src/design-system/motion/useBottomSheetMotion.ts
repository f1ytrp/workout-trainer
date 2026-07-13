import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { motion } from '../tokens';
import { useReducedMotionPreference } from './useReducedMotionPreference';

export function useBottomSheetMotion(visible: boolean, reducedMotionOverride?: boolean) {
  const reducedMotion = useReducedMotionPreference(reducedMotionOverride);
  const progress = useSharedValue(visible ? 1 : 0);
  useEffect(() => { progress.value = reducedMotion ? (visible ? 1 : 0) : withTiming(visible ? 1 : 0, { duration: motion.durations.standard }); }, [progress, reducedMotion, visible]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: (1 - progress.value) * 360 }] }));
  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value * 0.72 }));
  return { animatedStyle, backdropStyle, progress };
}
