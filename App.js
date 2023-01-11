import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import NewWorkoutScreen from "./screens/NewWorkoutScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";
import AddNewExerciseScreenNavigator from "./CustomNavigation";
import ExercisesScreen from "./screens/ExercisesScreen";

const Tab = createBottomTabNavigator();

export default function Apk() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Start") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Ćwiczenia") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Nowy Trening") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Historia") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Statystyki") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Start" component={HomeScreen} />
        <Tab.Screen
          name="Ćwiczenia"
          component={AddNewExerciseScreenNavigator}
          //component={ExercisesScreen}
        />
        <Tab.Screen name="Nowy Trening" component={NewWorkoutScreen} />
        <Tab.Screen name="Historia" component={HistoryScreen} />
        <Tab.Screen name="Statystyki" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
