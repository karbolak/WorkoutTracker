import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import * as SQLite from "expo-sqlite";

const HistoryScreen = (navigation) => {
  const db = SQLite.openDatabase("MyDatabase.db");
  const [tempId, setTempID] = useState(-1);
  const [workoutz, setWorkoutz] = useState([]);
  const [loading, setLoading] = useState(true);

  const wipeWorkouts = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM workoutz;");
    });
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS workoutz (work_id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, work_name TEXT, ex_1 TEXT);`
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

  return (
    <View>
      <Button title="Wipe Workouts" onPress={wipeWorkouts} />
      <ScrollView>
        {loading ? (
          <Text>"Loading..."</Text>
        ) : (
          <>
            {workoutz.map((workout) => (
              <View key={workout.work_id} style={styles.exerciseView}>
                <Text>{workout.work_id}</Text>
                <Text>{workout.work_name}</Text>
                <Text>{workout.ex_1}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
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

export default HistoryScreen;
