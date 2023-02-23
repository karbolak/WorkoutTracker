import * as React from "react";
import { Button, Text, View, Image } from "react-native";

const HomeScreen = (navigation) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 625, height: 300 }}
        source={require("../assets/HoMLogoInverted.png")}
      />
    </View>
  );
};

export default HomeScreen;
