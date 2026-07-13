import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { motion } from '../tokens';
import { useReducedMotionPreference } from './useReducedMotionPreference';

export function useEntranceAnimation(delay = 0, reducedMotionOverride?: boolean) {
  const reducedMotion = useReducedMotionPreference(reducedMotionOverride);
  const opacity = useSharedValue(reducedMotion ? 1 : 0);
  const translateY = useSharedValue(reducedMotion ? 0 : 16);
  useEffect(() => {
    if (reducedMotion) { opacity.value = 1; translateY.value = 0; return; }
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration: motion.durations.standard });
      translateY.value = withSpring(0, motion.springs.entrance);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, opacity, reducedMotion, translateY]);
  return useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ translateY: translateY.value }] }));
}
