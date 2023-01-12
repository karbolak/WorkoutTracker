// importing required components from the react native assets
import * as React from "react";

// importing components required for react navigation
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// importing icons for the tabs of the bottom tab bar
import Ionicons from "@expo/vector-icons/Ionicons";

// importing other screens
import HomeScreen from "./screens/HomeScreen";
import NewWorkoutScreen from "./screens/NewWorkoutScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";
import ExercisesScreen from "./screens/ExercisesScreen";

const Tab = createBottomTabNavigator();

// creating and exporting "Apk" function
export default function Apk() {
  return (
    <NavigationContainer>
      {/* creation of the bottom tab navigator */}
      <Tab.Navigator
        /* adding a route prop to the navigator contains various information
      regarding current route (place in navigation hierarchy component lives)*/
        screenOptions={({ route }) => ({
          // declaring three parameters of the icons of the bottom tab bar
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            /* conditional statement assuring the correct functioning of the bottom tab bar icons,
             in a way that when user is currently using one of the bottom tab screens, 
             its icon is highlited with the accent colour, while the icons of other screen tabs are
             greyed out */
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
        {/* creation of the bottom tab navigation bar, where component is one of the screens
         imported in the beginning of this file code */}
        <Tab.Screen name="Start" component={HomeScreen} />
        <Tab.Screen name="Ćwiczenia" component={ExercisesScreen} />
        <Tab.Screen name="Nowy Trening" component={NewWorkoutScreen} />
        <Tab.Screen name="Historia" component={HistoryScreen} />
        <Tab.Screen name="Statystyki" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
