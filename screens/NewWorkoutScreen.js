import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Items,
  Table,
  TableRow,
  TableCell,
  TouchableOpacity,
  Settings,
} from "react-native";
import * as SQLite from "expo-sqlite";

const NewWorkoutScreen = (navigation) => {
  const db = SQLite.openDatabase("MyDatabase.db");
  const [TempId, setTempID] = useState(-1);
  const [items, setItems] = useState([]);
  const [Workoutz, setWorkoutz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY NOT NULL, name TEXT, type TEXT, description TEXT);`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS workoutz (work_id INTEGER PRIMARY KEY NOT NULL, work_name TEXT, ex_1 INTEGER);`
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

  const addItem = (id) => {
    setTempID(id);
  };

  const addWorkoutz = () => {
    const WorkID = 2;
    const WorkNAM = `Test`;

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO workoutz (work_id, work_name, ex_1) values (?, ?, ?);",
        [WorkID, WorkNAM, TempId],
        (txObj, resultSet) => {
          const newWorkoutz = [
            ...Workoutz,
            {
              work_id: WorkID,
              work_name: WorkNAM,
              ex_1: TempId,
            },
          ];
          console.log({ newWorkoutz, Workoutz });
          setWorkoutz(newWorkoutz);
        }
      );
    });
  };

  console.log(Workoutz);
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ScrollView>
          {items.map((item) => (
            <View key={item.id} style={styles.exerciseView}>
              <TouchableOpacity key={item.id} onPress={() => addItem(item.id)}>
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
                <Text>{item.type}</Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ScrollView>
          {loading ? (
            <Text>"Text"</Text>
          ) : (
            <>
              {Workoutz.map((Workout) => (
                <View key={Workout.work_id} style={styles.exerciseView}>
                  <Text>{Workout.work_id}</Text>
                  <Text>{Workout.work_name}</Text>
                  <Text>{Workout.ex_1}</Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
        <Button title="Add Workout" onPress={addWorkoutz} />
      </View>
    </View>
  );
};

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
