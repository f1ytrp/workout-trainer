import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
        workout.name === name
          ? { ...workout, exercise: [...workout.exercise, exercise] }
          : workout
      ),
    })),
}),
{
  name: 'workout-storage',
  getStorage: () => AsyncStorage,
}));

export default useWorkoutStore;