import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
    const navigation = useNavigation();
    const handleStartWorkout = () => {
        navigation.navigate('WorkoutSession');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>
      <TouchableOpacity style={styles.card} onPress={handleStartWorkout}>
        <Text style={styles.cardTitle}>Start Your Workout Session</Text>
        <Text style={styles.cardSubtext}>Tap to begin a new session</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EEFF00',
    marginTop: 50,
    marginLeft: 20,
},
card: {
    backgroundColor: '#1E1E2F',
    borderRadius: 10,
    padding: 20,
    margin: 20,
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
});
