// importing all the required components from the react native assets
import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

// creating const function for the StatsScreen
const StatsScreen = (navigation) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Ekran Statystyki</Text>
    </View>
  );
};

// exporting the function so it can be imported by the "App.js" and used as a component
export default StatsScreen;
