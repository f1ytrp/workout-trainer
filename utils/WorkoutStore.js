import {create} from 'zustand';

const useWorkoutStore = create((set) => ({
    workouts: [],
    addWorkout: (name, exercise) => set((state) => ({
      workouts: [...state.workouts, {name, exercise: [exercise]}],
    })),
    addExerciseToWorkout: (name, exercise) => set((state)=> ({
      workouts: state.workouts.map((workout) => workout.name === name ? {...workout, exercise: [...workout.exercise, exercise]} : workout )
    }))
}))

export default useWorkoutStore;