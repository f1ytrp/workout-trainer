import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useWorkoutStore = create(persist((set) => ({
  workouts: [],
  addWorkout: (name, exercise) =>
    set((state) => ({
      workouts: [...state.workouts, { name, exercise: [exercise] }],
    })),
  addExerciseToWorkout: (name, exercise) =>
    set((state) => ({
      workouts: state.workouts.map((workout) =>
        workout.name === name ? { ...workout, exercise: [...workout.exercise, exercise] } : workout
      ),
    })),
}),
{
  name: 'workout-storage',
  storage: createJSONStorage(() => AsyncStorage),
  onRehydrateStorage: () => (state) => {
    console.log('[ZUSTAND] Rehydrating workout-storage from AsyncStorage');
    console.log('[ZUSTAND] Restored state:', state);
  }
}));

export default useWorkoutStore;