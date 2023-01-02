import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ExercisesScreen from "./screens/ExercisesScreen";
import AddNewExerciseScreen from "./screens/AddNewExerciseScreen";

const Stack = createStackNavigator();

const AddNewExerciseScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
      <Stack.Screen
        name="AddNewExerciseScreen"
        component={AddNewExerciseScreen}
      />
    </Stack.Navigator>
  );
};

export default AddNewExerciseScreenNavigator;
