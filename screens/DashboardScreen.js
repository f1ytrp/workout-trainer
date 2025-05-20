import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';

import ExerciseCard from '../components/ExerciseCard';


export default function DashboardScreen() {
    const navigation = useNavigation();
    const handleStartWorkout = () => {
        navigation.navigate('WorkoutSession');
  };

  const exercises = [
  {
    name: 'Bench Press',
    image: require('../assets/bench-press.png'),
  },
  {
    name: 'Incline Dumbbell Press',
    image: require('../assets/incline-dumbbell.png'),
  },
  {
    name: 'Chest-Fly',
    image: require('../assets/chest-fly.png'),
  }
];

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Welcome Back !</Text>
        <TouchableOpacity style={styles.card} onPress={handleStartWorkout}>
            <Image source={ require('../assets/session.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Start Your Workout Session</Text>
            <Text style={styles.cardSubtext}>Tap to begin a new session</Text>
        </TouchableOpacity>

        <View style={styles.hrline} />
        <Text style={styles.header}>Chest exercises</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseList}>
          {exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#0E1421', 
    padding: 20,
},
  heading: { 
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EEFF00',
    marginTop: 50,
    marginLeft: 20,
},
card: {
    backgroundColor: '#1E1E2F',
    borderRadius: 10,
    padding: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
},
cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEFF00',
},
cardSubtext: {
    fontSize: 14,
    color: '#888888',
},
cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
},
hrline: {
    borderBottomColor: '#3E25F5',
    borderBottomWidth: 1,
    marginVertical: 20,
},
header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EEFF00',
    marginBottom: 20,
},
exerciseList: {
  flexDirection: 'row',
  paddingBottom: 10,
}
});
