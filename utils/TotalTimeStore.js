import {create} from 'zustand';

const useTotalTimeStore = create((set) => ({
    totalWorkoutTime: 0,
    logWorkout: (duration) => set(state => ({
        totalWorkoutTime: state.totalWorkoutTime + duration
    })),
    resetSummary: () => set({ totalWorkoutTime: 0 }),
}))

export default useTotalTimeStore