import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReducedMotionPreference(override?: boolean): boolean {
  const [systemPreference, setSystemPreference] = useState(false);
  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => { if (mounted) setSystemPreference(enabled); });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setSystemPreference);
    return () => { mounted = false; subscription.remove(); };
  }, []);
  return override ?? systemPreference;
}
