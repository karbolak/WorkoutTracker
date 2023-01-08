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

const ExercisesScreen = (navigation) => {
  const [database, setDatabase] = useState();
  const [items, setItems] = useState([]);
  const [exerciseName, setExerciseName] = React.useState(null);
  const [exerciseType, setExerciseType] = React.useState(null);
  const [exerciseDescription, setExerciseDescription] = React.useState(null);

  useEffect(() => {
    if (!database) {
      const db = SQLite.openDatabase("MyDatabase.db");
      setDatabase(db);
    }
  }, []);

  useEffect(() => {
    if (database) {
      database.transaction(
        (tx) => {
          tx.executeSql(
            "create table if not exists items (id integer primary key not null AUTOINCREMENT, name text, type text, description text);"
          );
        },
        null,
        loadItems
      );
    }
  }, [database]);

  const loadItems = () => {
    database.transaction((tx) => {
      tx.executeSql("select * from items;", [], (_, { rows: { _array } }) => {
        setItems(_array);
        console.log(_array);
      });
    });
  };

  const addItem = () => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          "insert into items (name, type, description) values (?, ?, ?);",
          [exerciseName, exerciseType, exerciseDescription]
        );
      },
      null,
      loadItems
    );
  };

  const wipeItems = () => {
    database.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM Items;");
      },
      null,
      loadItems
    );
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
      <Button title="Add Item" onPress={addItem} />
      <Button title="Wipe Items" onPress={wipeItems} />
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
