import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ExerciseCard from '../components/ExerciseCard';


export default function DashboardScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    'DMSans-Bold': require('../assets/fonts/DM-sans/DMSans_24pt-Bold.ttf'),
    'DMSans-Medium': require('../assets/fonts/DM-sans/DMSans_24pt-Medium.ttf'),
    'DMSans-Regular': require('../assets/fonts/DM-sans/DMSans_24pt-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text style={{ color: 'white', marginTop: 50 }}>Loading fonts...</Text>;
  }

  const handleStartWorkout = () => {
    navigation.navigate('WorkoutSession');
  };

  const exercises1 = [
  {
    name: 'Barbell Bench Press',
    image: require('../assets/bench-press.png'),
  },
  {
    name: 'Chest Fly',
    image: require('../assets/chest-fly.png'),
  },
  {
    name: 'incline dumbbell press',
    image: require('../assets/incline-dumbbell.png'),
  },
];
  const exercises2 = [
  {
    name: 'barbell bench press',
    image: require('../assets/bench-press.png'),
  },
  {
    name: 'chest fly',
    image: require('../assets/chest-fly.png'),
  },
  {
    name: 'incline dumbbell press',
    image: require('../assets/incline-dumbbell.png'),
  },
];
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.heading}>Welcome Back !</Text>
        <TouchableOpacity style={styles.card} onPress={handleStartWorkout}>
            <Image source={ require('../assets/session.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Start Your Workout Session</Text>
            <Text style={styles.cardSubtext}>Tap to begin a new session</Text>
        </TouchableOpacity>

        <View style={styles.hrline} />
        <Text style={styles.header}>Chest Exercises</Text>
        <View style={{ height: 270, marginBottom: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }} style={styles.exerciseList}>
            {exercises1.map((exercises1, index) => (
              <ExerciseCard key={index} exercise={exercises1} />
            ))}
          </ScrollView>
        </View>
        
        <Text style={styles.header}>Arm Exercises</Text>
        <View style={{ height: 270, marginBottom: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }} style={styles.exerciseList}>
            {exercises2.map((exercises2, index) => (
              <ExerciseCard key={index} exercise={exercises2} />
            ))}
          </ScrollView>
        </View>
    </ScrollView>
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
    fontFamily: 'DMSans-Bold',
    color: '#93E13C',
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
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
},
cardSubtext: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'DMSans-Bold',
    color: '#93E13C',
    marginBottom: 20,
},
exerciseList: {
  flexDirection: 'row',
  paddingBottom: 10,
}
});
