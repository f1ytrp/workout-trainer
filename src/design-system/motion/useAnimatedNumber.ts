import { useEffect } from 'react';
import { useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated';
import { motion } from '../tokens';
import { useReducedMotionPreference } from './useReducedMotionPreference';

export function useAnimatedNumber(target: number, reducedMotionOverride?: boolean): SharedValue<number> {
  const reducedMotion = useReducedMotionPreference(reducedMotionOverride);
  const value = useSharedValue(target);
  useEffect(() => { value.value = reducedMotion ? target : withTiming(target, { duration: motion.durations.slow }); }, [reducedMotion, target, value]);
  return value;
}
