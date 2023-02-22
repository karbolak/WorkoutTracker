import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import NewWorkoutScreen from "./screens/NewWorkoutScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ExercisesScreen from "./screens/ExercisesScreen";

const Tab = createBottomTabNavigator();

export default function Apk() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Exercises") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "New Workout") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Exercises" component={ExercisesScreen} />
        <Tab.Screen name="New Workout" component={NewWorkoutScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
