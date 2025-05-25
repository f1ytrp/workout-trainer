import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BodyPart from '../screens/BodyPart';
import ExerciseList from '../screens/ExerciseList';
import ExerciseDetail from '../screens/ExerciseDetail';

const Stack = createNativeStackNavigator();

export default function BrowseNav() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: true,
        headerStyle: { backgroundColor: '#0B0B1F' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="BodyPart" component={BodyPart} options={{ headerShown: false }} />
      <Stack.Screen name="ExerciseList" component={ExerciseList} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
    </Stack.Navigator>
  );
}
