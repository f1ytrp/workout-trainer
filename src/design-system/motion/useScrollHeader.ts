import { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export function useScrollHeader(threshold = 80) {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({ onScroll: (event) => { scrollY.value = event.contentOffset.y; } });
  const animatedStyle = useAnimatedStyle(() => ({ opacity: scrollY.value > threshold ? 1 : 0 }));
  return { onScroll, scrollY, animatedStyle };
}
