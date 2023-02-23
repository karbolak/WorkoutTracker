import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import * as SQLite from "expo-sqlite";
import { database } from "../utils/database";

const HistoryScreen = (navigation) => {
  const [tempId, setTempID] = useState(-1);
  const [workoutz, setWorkoutz] = useState([]);
  const [loading, setLoading] = useState(true);

  const wipeWorkouts = () => {
    database.workouts.wipe();
  };

  useEffect(() => {
    database.workouts.getAll(setWorkoutz);
    setLoading(false);
  }, []);

  return (
    <View>
      <Button color="orange" title="Wipe Workouts" onPress={wipeWorkouts} />
      <ScrollView>
        {loading ? (
          <Text>"Loading..."</Text>
        ) : (
          <>
            {workoutz.map((workout) => (
              <ScrollView>
                <View key={workout.work_id} style={styles.exerciseView}>
                  <Text>{workout.work_id}</Text>
                  <Text>{workout.work_name}</Text>
                  <Text>{workout.ex_1}</Text>
                </View>
              </ScrollView>
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
