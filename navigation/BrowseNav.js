import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import BodyPart from '../screens/BodyPart';
import ExerciseList from '../screens/ExerciseList';
import ExerciseDetail from '../screens/ExerciseDetail';

const Stack = createStackNavigator();

export default function BrowseNav() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: true,
        headerStyle: { backgroundColor: '#0B0B1F' },
        headerTintColor: '#fff',
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="BodyPart" component={BodyPart} options={{ headerShown: false }} />
      <Stack.Screen name="ExerciseList" component={ExerciseList} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
    </Stack.Navigator>
  );
}
