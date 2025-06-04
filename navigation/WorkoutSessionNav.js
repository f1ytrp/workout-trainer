import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutSessionScreen from '../screens/WorkoutSessionScreen';
import ExerciseDetail from '../screens/ExerciseDetail';
import BodyPart from '../screens/BodyPart';
import ExerciseList from '../screens/ExerciseList';

const Stack = createStackNavigator();

export default function WorkoutSessionNav() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        headerStyle: { backgroundColor: '#0B0B1F' },
        headerTintColor: '#fff',
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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