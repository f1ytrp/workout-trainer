import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutSessionScreen from '../screens/WorkoutSessionScreen';
import ExerciseDetail from '../screens/ExerciseDetail';
import BodyPart from '../screens/BodyPart';
import ExerciseList from '../screens/ExerciseList';


const Stack = createNativeStackNavigator();

export default function WorkoutSessionNav() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        headerStyle: { backgroundColor: '#0B0B1F' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
      <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} />
      <Stack.Screen name="BodyPart" component={BodyPart} />
      <Stack.Screen 
        name="ExerciseList" 
        component={ExerciseList} 
        options={{
          headerShown: true,
          title: 'Exercise List',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="ExerciseDetail" 
        component={ExerciseDetail}
        options={{
          headerShown: true,
          title: 'Exercise Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}