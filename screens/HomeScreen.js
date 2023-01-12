// importing components from react native assets
import * as React from "react";
import { Button, Text, View, Image } from "react-native";

// creating const function for the Home Screen
const HomeScreen = (navigation) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Ekran Startowy</Text>
      {/* adding an image which is located inside "assets" directory within the program */}
      <Image
        style={{ width: 312.5, height: 150 }}
        source={require("../assets/HoMLogoInverted.png")}
      />
    </View>
  );
};

// exporting the function so it can be imported by the "App.js" and used as a component
export default HomeScreen;
