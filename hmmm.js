import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";

// import the exercises database
import EXERCISES from "./exercises-database";

const WorkoutScreen = () => {
  // state to track the selected exercises
  const [selectedExercises, setSelectedExercises] = useState([]);

  // helper function to add an exercise to the selected exercises array
  const selectExercise = (exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  return (
    <View>
      <Text style={styles.title}>Create Your Workout</Text>
      <FlatList
        data={EXERCISES}
        renderItem={({ item }) => (
          <Button title={item.name} onPress={() => selectExercise(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.list}
      />
      <Text style={styles.title}>Selected Exercises</Text>
      <FlatList
        data={selectedExercises}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  list: {
    marginHorizontal: 8,
  },
  item: {
    marginVertical: 8,
  },
});

export default WorkoutScreen;
