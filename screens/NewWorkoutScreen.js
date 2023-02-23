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
import { database } from "../utils/database";

const NewWorkoutScreen = (navigation) => {
  const [tempId, setTempID] = useState(-1);
  const [tempName, setTempName] = useState("");
  const [items, setItems] = useState([]);
  const [workoutz, setWorkoutz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workoutName, setWorkoutName] = useState(null);

  useEffect(() => {
    if (!database) {
      const db = openDatabase("Database.sqlite3");
      setDatabase(db);
    }
  }, []);

  useEffect(() => {
    database.items.getAll(setItems);
    database.workouts.getAll(setWorkoutz);
    setLoading(false);
  }, []);

  const addItem = (name) => {
    setTempName(name);
  };

  const loadWorkouts = () => {
    database.workouts.getAll(setWorkoutz);
  };

  const addWorkoutz = () => {
    database.workouts.insert(
      {
        name: workoutName,
        ex_1: tempName,
      },
      loadWorkouts
    );
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
      <Button color="orange" title="Add Workout" onPress={addWorkoutz} />
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
