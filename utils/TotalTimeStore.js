import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTotalTimeStore = create(
  persist(
    (set, get) => ({
      totalWorkoutTime: 0,
      lastWorkoutDay: '',
      dailyWorkoutDuration: {},

      logWorkout: (duration) => {
        const ddmm = new Date();
        const dd = String(ddmm.getDate()).padStart(2, '0');
        const mm = String(ddmm.getMonth() + 1).padStart(2, '0');
        const today = `${dd}/${mm}`;
        const { dailyWorkoutDuration } = get();

        const updatedDaily = {
          ...dailyWorkoutDuration,
          [today]: (dailyWorkoutDuration[today] || 0) + duration,
        };

        console.log('Logging workout for date:', today);
        console.log('Duration added:', duration);
        console.log('Updated daily workout durations:', updatedDaily);

        set((state) => ({
          totalWorkoutTime: state.totalWorkoutTime + duration,
          lastWorkoutDay: today,
          dailyWorkoutDuration: updatedDaily,
        }));
      },

      resetSummary: () =>
        set({
          totalWorkoutTime: 0,
          lastWorkoutDay: '',
          dailyWorkoutDuration: {},
        }),
    }),
    {
      name: 'total-time-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrating workout-storage from AsyncStorage');
        console.log('Restored state:', state);
      }
    }
  )
);

export default useTotalTimeStore;