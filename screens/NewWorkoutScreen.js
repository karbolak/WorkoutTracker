import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Settings,
} from "react-native";
import * as SQLite from "expo-sqlite";

const NewWorkoutScreen = (navigation) => {
  const db = SQLite.openDatabase("MyDatabase.db");
  const [tempId, setTempID] = useState(-1);
  const [tempName, setTempName] = useState("");
  const [items, setItems] = useState([]);
  const [workoutz, setWorkoutz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workoutName, setWorkoutName] = React.useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY NOT NULL AUTOINCREMENT, name TEXT, type TEXT, description TEXT);`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS workoutz (work_id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, work_name TEXT, ex_1 TEXT);`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items",
        null,
        (txObj, resultSet) => setItems(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM workoutz",
        null,
        (txObj, resultSet) => setWorkoutz(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    setLoading(false);
  }, []);

  /*
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name FROM items WHERE id = ?",
      [tempId],
      null,
      (txObj, resultSet) => setTempName(resultSet.rows._array[0]),
      (txObj, error) => console.log(error)
    );
  });
*/
  const addItem = (name) => {
    setTempName(name);
  };

  const addWorkoutz = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO workoutz (work_name, ex_1) values (?, ?);",
        [workoutName, tempName],
        (txObj, resultSet) => {
          const newWorkoutz = [
            ...workoutz,
            {
              work_name: workoutName,
              ex_1: tempName,
            },
          ];
          setWorkoutz(newWorkoutz);
        }
      );
    });
  };

  return (
    <View>
      <TextInput
        style={button.input}
        onChangeText={setWorkoutName}
        value={workoutName}
        placeholder="Workout Name"
        keyboardType="text"
      />
      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.exerciseView}>
            <TouchableOpacity key={item.id} onPress={() => addItem(item.name)}>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
              <Text>{item.type}</Text>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Button title="Add Workout" onPress={addWorkoutz} />
    </View>
  );
};

const button = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const styles = StyleSheet.create({
  tableHeader: {
    fontWeight: "bold",
  },
  exerciseView: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
});

export default NewWorkoutScreen;
