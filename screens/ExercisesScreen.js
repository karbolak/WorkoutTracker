import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { color } from "react-native-reanimated";
import { database } from "../utils/database";

const ExercisesScreen = (navigation) => {
  const [items, setItems] = useState([]);
  const [exerciseName, setExerciseName] = useState(null);
  const [exerciseType, setExerciseType] = useState(null);
  const [exerciseDescription, setExerciseDescription] = useState(null);

  const loadItems = () => {
    database.items.getAll(setItems);
  };

  const addItem = () => {
    database.items.insert(
      {
        name: exerciseName,
        type: exerciseType,
        description: exerciseDescription,
      },
      loadItems
    );
  };

  const wipeItems = () => {
    database.items.wipe(loadItems);
  };

  return (
    <View>
      <TextInput
        style={button.input}
        onChangeText={setExerciseName}
        value={exerciseName}
        placeholder="Exercise Name"
        keyboardType="text"
      />
      <TextInput
        style={button.input}
        onChangeText={setExerciseType}
        value={exerciseType}
        placeholder="Exercise Type"
        keyboardType="text"
      />
      <TextInput
        style={button.input}
        onChangeText={setExerciseDescription}
        value={exerciseDescription}
        placeholder="Exercise YT Link"
        keyboardType="text"
      />
      <Button color="orange" title="Add Item" onPress={addItem} />
      <Button color="orange" title="Wipe Items" onPress={wipeItems} />
      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.exerciseView}>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
            <Text
              style={styles.textStyle}
              onPress={() => Linking.openURL(item.description)}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  },
  textStyle: {
    textDecorationLine: "underline",
    color: "blue",
  },
});

export default ExercisesScreen;
