import {create} from 'zustand';

const useWorkoutStore = create((set) => ({
    workouts: [],
    addWorkout: (newWorkout) => set((state) => ({
      workouts: [...state.workouts, newWorkout],
    })),
}))

export default useWorkoutStore;