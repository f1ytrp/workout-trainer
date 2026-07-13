import { useCallback } from 'react';
import { Vibration } from 'react-native';

export function useHapticAction(enabled = true) {
  return useCallback(() => { if (enabled) Vibration.vibrate(8); }, [enabled]);
}
