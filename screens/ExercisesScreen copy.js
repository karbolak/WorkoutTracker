import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Exercises.db");

function MainScreen({ navigation }) {
  const [S_ExID, setExID] = useState("");
  const [S_ExName, setExName] = useState("");
  const [S_Type, setType] = useState();
  const [S_YTLink, setYTLink] = useState("");
  const [S_MET, setMET] = useState("");
  const [S_Favourite, setFavourite] = useState("");

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ExercisesList_Table'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS ExercisesList_Table", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS Exercises_Table(ExID INTEGER PRIMARY KEY AUTOINCREMENT, ExName TEXT, Type TEXT, YTLink TEXT, MET INTEGER, Favourite INTEGER)",
              []
            );
          }
        }
      );
    });
  }, []);

  const insertData = () => {
    if (S_ExName == "" || S_Type == "" || S_YTLink == "") {
      Alert.alert("Please Enter All the Values");
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          "INSERT INTO ExercisesList_Table (ExName, Type, YTLink) VALUES (?,?,?)",
          [S_ExName, S_Type, S_YTLink],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert("Data Inserted Successfully....");
            } else Alert.alert("Failed....");
          }
        );
      });
    }
  };

  const navigateToViewScreen = () => {
    navigation.navigate("ViewAllExercisesScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 24, textAlign: "center", color: "#000" }}>
          Insert Data Into SQLite Database
        </Text>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setExName(text)}
          placeholder="Enter Exercise Name"
          value={S_ExName}
        />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setType(text)}
          placeholder="Enter Exercise Type"
          //keyboardType={'numeric'}
          value={S_Type}
        />

        <TextInput
          style={[styles.textInputStyle, { marginBottom: 20 }]}
          onChangeText={(text) => setYTLink(text)}
          placeholder="Enter Exercise YT link"
          value={S_YTLink}
        />

        <TouchableOpacity style={styles.touchableOpacity} onPress={insertData}>
          <Text style={styles.touchableOpacityText}>
            {" "}
            Click Here To Insert Data Into SQLite Database{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.touchableOpacity,
            { marginTop: 20, backgroundColor: "#33691E" },
          ]}
          onPress={navigateToViewScreen}
        >
          <Text style={styles.touchableOpacityText}>
            {" "}
            Click Here View All Exercises List{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function ViewAllExercisesScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM ExercisesList_Table", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setItems(temp);

        if (results.rows.length >= 1) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      });
    });
  }, []);

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          No Record Inserted Database is Empty...
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {empty ? (
          emptyMSG(empty)
        ) : (
          <FlatList
            data={items}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View key={item.student_id} style={{ padding: 20 }}>
                <Text style={styles.itemsStyle}> Id: {item.ExID} </Text>
                <Text style={styles.itemsStyle}> Name: {item.ExName} </Text>
                <Text style={styles.itemsStyle}> Type: {item.Type} </Text>
                <Text style={styles.itemsStyle}> YTLink: {item.YTLink} </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

const ExercisesScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} />

      <Stack.Screen
        name="ViewAllExercisesScreen"
        component={ViewAllExercisesScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  touchableOpacity: {
    backgroundColor: "#0091EA",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  touchableOpacityText: {
    color: "#FFFFFF",
    fontSize: 23,
    textAlign: "center",
    padding: 8,
  },

  textInputStyle: {
    height: 45,
    width: "90%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#00B8D4",
    borderRadius: 7,
    marginTop: 15,
  },

  itemsStyle: {
    fontSize: 22,
    color: "#000",
  },
});

/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});
*/

export default ExercisesScreen;
