import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import useWorkoutStore  from '../utils/WorkoutStore';
import useTotalTimeStore from '../utils/TotalTimeStore';
import timerFormat from '../components/TimerFormat';
import DailyChart from '../components/DailyChart';

export default function ProfileScreen() {
  const workouts = useWorkoutStore((state) => state.workouts)
  const totalWorkoutTime = useTotalTimeStore((state) => state.totalWorkoutTime);
  const formattedTime = timerFormat(totalWorkoutTime);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>Your Profile 👤</Text>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>Placeholder Name</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>placeholder@email.com</Text>
      </View>

      <Text style={styles.header}>Your Workouts 🏋️‍♂️</Text>
      {workouts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't created any workouts yet. </Text>
          <Text style={styles.emptyText2}>Click on the Browse-Section to add exercises to a new workout (or create a new one). It will appear here! </Text>
        </View>
      ) : (
        <View style={styles.activityCard}>
          <Text style={styles.statTitle}>Workouts Created: {workouts.length}</Text>
          {workouts.map((workout, index) => (
            <View style={styles.chartContainer} key={index}>
              <Text style={styles.workoutTitle}>{index+1}. {workout.name}</Text>
              <View style={styles.exerciseList}>
                {workout.exercise.map((ex, idx) => (
                <Text key={idx} style={styles.exerciseItem}> 
                  • {ex.name} <Text style={styles.bodyPart}>({ex.bodyPart})</Text>
                </Text>
                ))}
              </View>
            </View> 
          ))}
        </View>
      )}

      <Text style={styles.chartTitle}>Workout Progress 📈</Text>
      <View style={styles.activityCard}>
        <Text style={styles.statTitle}>Daily Progress</Text>  
        <View style={styles.chartContainer}>
          {totalWorkoutTime > 0 ? (
            <DailyChart />
          ) : (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>
                No data yet. Start a workout to track your progress.
              </Text>
            </View>
          )}   
        </View>

        <Text style={styles.statTitle}>Workout Activity</Text>
        <Text style={styles.statItem}>✅ Workouts Completed: 0</Text>
        <Text style={styles.statItem}>⏱️ Total Time: {formattedTime}</Text>
        <Text style={styles.statItem}>🔥 This Week: 0 sessions</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#0E1421', 
    padding: 20,
    paddingTop: 50,
},
  header: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#1C2230',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  label: {
    color: '#94A3B8',
    fontSize: 14,
  },
  value: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  statsCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'DMSans-Medium',
  },
  statItem: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 6,
  },
  emptyContainer: {
    backgroundColor: '#1C2230',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  emptyText: {
    color: '#CCCCCC',
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'DMSans-Medium',
    marginBottom: 12,
  },
  emptyText2: {
    color: '#CCCCCC',
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'DMSans-Regular',
    marginBottom: 6,
  },
  activityCard: {
    backgroundColor: '#1C2230',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  chartTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    marginTop: 16,
    marginBottom: 12,
  },
  chartPlaceholder: {
    alignItems: 'center',
  },
  chartPlaceholderText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
  },
  exerciseItem: {
    color: '#E2E8F0',
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'DMSans-Regular',
  },
  scrollContent: {
    paddingBottom: 140,
  },
  exerciseList: {
    marginTop: 6,
    paddingLeft: 6,
  },
  workoutTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    marginBottom: 8,
  },
  bodyPart: {
    color: '#94A3B8',
    fontSize: 13,
    fontFamily: 'DMSans-Regular',
  },
})
